import axios from "axios";
import { t } from "i18next";
import { toNumber, toText } from "mcsmanager-common";
import { customAlphabet } from "nanoid";
import { $t } from "../i18n";
import RemoteRequest from "../service/remote_command";
import RemoteServiceSubsystem from "../service/remote_service";
import user_service from "../service/user_service";
import { systemConfig } from "../setting";
import { getInstancesByUuid, IAdvancedInstanceInfo } from "./instance_service";

// A commercial platform for selling instances released by the MCSManager Dev Team.
// Currently, it only supports some countries and regions.
// If you do not turn on "Commercial Mode", MCSManager will not send any data.
export const REDEEM_PLATFORM_ADDR = " http://localhost:5174";

// ------- Protocol Define -------

export interface IRedeemResponseProtocol<T> {
  code: number;
  message: string;
  data: T;
}

export interface INodeStatusProtocol {
  name: string;
  id: string;
  ip: string;
  port: number;
  available: boolean;
  running: number;
  instances: number;
}

export interface IInstanceInfoProtocol {
  instance_id: string;
  name: string;
  expire: number;
  status: number;
  lines: Array<{ title: string; value: any }>;
  ports: IPortInfo[];
}

export interface IBuyResponseProtocol {
  instance_id: string;
  instance_config: any;
  username: string;
  password: string;
  uuid: string;
  expire: number;
  instance_info?: IInstanceInfoProtocol;
}

export interface IBuyRequestProtocol {
  category_id: number;
  node_id: string;
  username: string;
  hours: number;
  payload: Partial<IGlobalInstanceConfig>;
  code?: string;
  instance_id?: string;
}

export enum RequestAction {
  BUY = "buy",
  RENEW = "renew",
  QUERY_INSTANCE = "query_instance",
  PING = "ping",
  SSO_TOKEN = "sso_token"
}

export interface IPortInfo {
  host: number;
  container: number;
  protocol: string;
}

// ------- Define End ------

const getNanoId = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6
);

export async function requestUseRedeem(
  panelId: string,
  registerCode: string,
  productId: string | number,
  daemonId?: string,
  code?: string,
  isDelete?: boolean
) {
  const { data: responseData } = await axios.post<IRedeemResponseProtocol<IBusinessProductInfo>>(
    `${REDEEM_PLATFORM_ADDR}/api/iframe_instances/use_redeem`,
    {
      panelId,
      registerCode,
      productId,
      daemonId,
      code,
      isDelete
    },
    {
      headers: {
        "X-Panel-Id": panelId,
        "X-Register-Code": registerCode
      }
    }
  );
  if (responseData.code !== 200) {
    throw new Error(responseData.message);
  }
  return responseData.data;
}

export async function requestRemotePlatform<T = any>(method: string, url: string, data: any = {}) {
  const { data: responseData } = await axios.request<IRedeemResponseProtocol<T>>({
    url: `${REDEEM_PLATFORM_ADDR}${url}`,
    data:
      method === "POST"
        ? {
            panelId: systemConfig?.panelId || "",
            registerCode: systemConfig?.registerCode || "",
            ...data
          }
        : undefined,
    params:
      method === "GET"
        ? {
            panelId: systemConfig?.panelId || "",
            registerCode: systemConfig?.registerCode || "",
            ...data
          }
        : undefined,
    method: method,
    headers: {
      "X-Panel-Id": systemConfig?.panelId || "",
      "X-Register-Code": systemConfig?.registerCode || ""
    }
  });
  if (responseData.code !== 200) {
    throw new Error(responseData.message);
  }
  return responseData.data;
}

function formatInstanceData(instance: IAdvancedInstanceInfo): IInstanceInfoProtocol {
  let ports: string[] = instance.docker?.ports ?? [];
  let portRules: Array<IPortInfo> = [];
  if (ports?.length > 0) {
    ports.forEach((line: string) => {
      // line = "23333:24444/tcp"
      const [ports, protocol] = line.split("/");
      if (!ports || !protocol) return;
      const [host, container] = ports.split(":");
      if (isNaN(Number(container)) || isNaN(Number(host))) return;
      portRules.push({
        protocol,
        container: Number(container),
        host: Number(host)
      });
    });
  }
  const lines = [];
  if (instance.info?.maxPlayers && Number(instance.info?.maxPlayers) != -1) {
    lines.push({
      title: t("TXT_CODE_7e9727bd"),
      value: `${instance.info?.currentPlayers}/${instance.info?.maxPlayers}`
    });
  }
  return {
    instance_id: instance.instanceUuid,
    name: instance.nickname || "",
    status: instance.status || 0,
    ports: portRules,
    expire: instance.endTime || 0,
    lines
  };
}

export function parseUserName(t?: string) {
  if (!t || typeof t !== "string") return "";
  return toText(t) ?? "";
}

export async function buyOrRenewInstance(
  request_action: RequestAction,
  params: IBuyRequestProtocol,
  handler: {
    onCreateConfirm?: (instanceId: string) => Promise<void>;
  } = {}
): Promise<IBuyResponseProtocol> {
  const node_id = toText(params.node_id) ?? "";
  const instance_id = toText(params.instance_id) ?? "";
  const username = parseUserName(params.username);
  const hours = toNumber(params.hours) ?? 0;
  const payload: Partial<IGlobalInstanceConfig> = params.payload ?? {};

  const remoteService = RemoteServiceSubsystem.getInstance(node_id || "");
  if (!remoteService?.available) {
    throw new Error(t("TXT_CODE_bed32084"));
  }

  const remoteRequest = new RemoteRequest(remoteService);

  if (request_action === RequestAction.BUY) {
    payload.category = params.category_id || 0;
    payload.endTime =
      (payload.endTime ? Number(payload.endTime) : Date.now()) + hours * 3600 * 1000;

    if (username.length < 4) {
      throw new Error($t("TXT_CODE_router.user.invalidUserName"));
    }

    payload.nickname = "App-" + username + "-" + getNanoId(6);
    const { instanceUuid: newInstanceId, config: newInstanceConfig } = await remoteRequest.request(
      "instance/new",
      payload
    );
    if (!newInstanceId) throw new Error(t("TXT_CODE_728fdabf"));

    let user = user_service.getUserByUserName(username);
    let newPassword = "";

    await handler.onCreateConfirm?.(newInstanceId);

    if (user) {
      await user_service.edit(user.uuid, {
        instances: [
          ...user.instances,
          {
            instanceUuid: newInstanceId,
            daemonId: node_id
          }
        ]
      });
    } else {
      newPassword = getNanoId(12);
      user = await user_service.create({
        userName: username,
        passWord: newPassword,
        permission: 1,
        instances: [
          {
            instanceUuid: newInstanceId,
            daemonId: node_id
          }
        ]
      });
    }

    return {
      instance_id: newInstanceId,
      instance_config: newInstanceConfig,
      username: user.userName,
      password: newPassword,
      uuid: user.uuid,
      expire: toNumber(newInstanceConfig.endTime) || 0,
      instance_info: formatInstanceData(newInstanceConfig)
    };
  }

  if (request_action === RequestAction.RENEW) {
    const instanceInfo = await remoteRequest.request("instance/detail", {
      instanceUuid: instance_id
    });

    const config: IGlobalInstanceConfig = instanceInfo.config || {};

    if (!config.category || isNaN(Number(config.category))) {
      throw new Error(t("TXT_CODE_ed81f72d"));
    }

    if (config.category !== Number(params.category_id)) {
      throw new Error(t("TXT_CODE_c5b38d90"));
    }

    if (!config) throw new Error(t("TXT_CODE_348c9098"));

    const curExpireTime = Number(config.endTime);
    if (!curExpireTime || isNaN(curExpireTime) || curExpireTime < Date.now()) {
      config.endTime = Date.now() + hours * 3600 * 1000;
    } else {
      config.endTime = curExpireTime + hours * 3600 * 1000;
    }

    await handler.onCreateConfirm?.(instance_id);

    await remoteRequest.request("instance/update", {
      instanceUuid: instance_id,
      config: config
    });

    return {
      instance_id,
      instance_config: config,
      expire: toNumber(config.endTime) || 0,
      username: "",
      password: "",
      uuid: ""
    };
  }

  throw new Error(t("TXT_CODE_4aaec75c"));
}

export async function queryInstanceByUserId(
  params: Record<string, any>
): Promise<IInstanceInfoProtocol[]> {
  const name = parseUserName(params.username) || "";
  const targetDaemonId = toText(params.node_id) ?? undefined;
  const user = user_service.getUserByUserName(name);
  if (!user) throw new Error(t("TXT_CODE_903b6c50"));

  const { instances = [] } = await getInstancesByUuid(user.uuid, targetDaemonId, true);
  const newInstancesInfo = instances.map((v) => {
    return formatInstanceData(v);
  });
  return newInstancesInfo;
}

export async function getNodeStatus(params: Record<string, any>): Promise<INodeStatusProtocol> {
  const nodeId = toText(params.node_id) ?? "";
  const remoteService = RemoteServiceSubsystem.getInstance(nodeId);
  if (!remoteService?.available) {
    throw new Error(t("TXT_CODE_bed32084"));
  }
  const remoteRequest = new RemoteRequest(remoteService);
  const remoteInfo = await remoteRequest.request("info/overview");
  remoteInfo.uuid = remoteService.uuid;
  remoteInfo.available = remoteService.available;

  remoteInfo.ip = remoteService.config?.ip;
  remoteInfo.port = remoteService.config?.port;
  remoteInfo.prefix = remoteService.config?.prefix;
  remoteInfo.remarks = remoteService.config?.remarks;

  return {
    name: String(remoteInfo.remarks),
    id: String(remoteInfo.uuid),
    ip: String(remoteInfo.ip),
    port: Number(remoteInfo.port),
    available: Boolean(remoteInfo.available),
    running: Number(remoteInfo.instance.running),
    instances: Number(remoteInfo.instance.total)
  };
}
