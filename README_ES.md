<div align="center">
  <a href="https://mcsmanager.com/" target="_blank">
    <img src="https://public-link.oss-cn-shenzhen.aliyuncs.com/mcsm_picture/logo.png" alt="MCSManagerLogo.png" width="510px" />    
  </a>

  <br />
  <br />

[![--](https://img.shields.io/badge/Support%20Platform-Windows/Linux/Mac-green.svg)](https://github.com/MCSManager)
[![Status](https://img.shields.io/badge/NPM-v8.9.14-blue.svg)](https://www.npmjs.com/)
[![Status](https://img.shields.io/badge/Node-v16.20.2-blue.svg)](https://nodejs.org/en/download/)
[![Status](https://img.shields.io/badge/License-Apache%202.0-red.svg)](https://github.com/MCSManager)

<p align="center">
  <a href="http://mcsmanager.com/"><img alt="Official Website" src="https://img.shields.io/badge/Site-Official Website-yellow"></a>
  <a href="https://docs.mcsmanager.com/"><img alt="EnglishDocs" src="https://img.shields.io/badge/Docs-English Document-blue"></a>
  <a href="https://discord.gg/BNpYMVX7Cd"><img alt="Discord" src="https://img.shields.io/badge/Discord-Join Us-5866f4"></a>
  
</p>

<br />

[English](README.md) - [简体中文](README_ZH.md) - [繁體中文](README_TW.md) - [Deutsch](README_DE.md) - [Português BR](README_PTBR.md) -
[日本語](README_JP.md) - [Spanish](README_ES.md) - [Thai](README_TH.md)

</div>

<br />

## ¿Qué es esto?

**MCSManager Panel** (abreviado: MCSM Panel) es un panel de administración web moderno, simple, multi-usuario, compatible con arquitectura distribuida y de despliegue rápido para servidores de juegos Minecraft y Steam.

MCSManager ha ganado popularidad dentro de las comunidades de juegos `Minecraft` y `Steam`. Te ayuda a gestionar centralmente múltiples servidores físicos, permitiéndote crear servidores de juegos en cualquier host, y proporciona un sistema de permisos multi-usuario seguro y confiable que puede ayudarte fácilmente a gestionar múltiples servidores. Ha estado proporcionando soporte de software saludable para administradores, personal de operaciones y desarrolladores individuales de servidores de juegos `Minecraft`, `Terraria` y `Steam`.

También es adecuado para cualquier actividad comercial, como proveedores de servicios IDC para venta de servidores privados, etc. Varias pequeñas y medianas empresas ya están usando este panel como software de gestión y ventas, y soporta idiomas de **múltiples países**.

<img width="3164" height="2060" alt="1" src="https://github.com/user-attachments/assets/570d2447-66dc-4c0b-b2d2-4c3176b51d67" />

<img width="1871" height="1342" alt="terminal" src="https://github.com/user-attachments/assets/7f6ed988-e402-4347-94ee-a0469f6658da" />

<img width="3164" height="2060" alt="3" src="https://github.com/user-attachments/assets/2722cf9f-de9b-4630-b0ea-c00283791d8d" />

<img width="3164" height="2060" alt="4" src="https://github.com/user-attachments/assets/c7a3165c-466b-42c5-b75a-16ada603b1da" />

<br />

## Características

1. Usa el mercado de aplicaciones para desplegar fácilmente servidores de juegos `Minecraft` o `Steam` con un clic.
2. Compatible con la mayoría de servidores de juegos `Steam`, como `Palworld`, `Squad`, `Project Zomboid` y `Terraria`, etc.
3. La interfaz web soporta diseño de tarjetas de arrastrar y soltar para crear tu diseño de interfaz preferido.
4. Soporta todas las imágenes en `Docker Hub`, soporta multi-usuario, soporta servicios de venta de instancias comerciales.
5. Soporta arquitectura distribuida, una interfaz web puede gestionar múltiples máquinas simultáneamente.
6. Pila tecnológica simple, ¡solo necesitas dominar TypeScript para completar todo el desarrollo de MCSManager!
7. Más...

<br />

## Entorno de Ejecución

El panel de control puede ejecutarse en plataformas `Windows` y `Linux`, no requiere instalación de base de datos, solo necesitas instalar el entorno `Node.js` y varios **comandos de descompresión**.

Debes usar [Node.js 16.20.2](https://nodejs.org/en) o superior, recomendamos usar la última versión LTS.

<br />

## Instalación

### Windows

Descarga: https://download.mcsmanager.com/mcsmanager_windows_release.zip

Iniciar panel:

```bash
start.bat
```

<br />

### Linux

**Comando de una línea para instalación rápida**

```bash
sudo su -c "wget -qO- https://script.mcsmanager.com/setup.sh | bash"
```

**Uso después de la instalación**

```bash
systemctl start mcsm-{web,daemon} # Iniciar panel
systemctl stop mcsm-{web,daemon}  # Detener panel
```

- El script solo se aplica a Ubuntu/Centos/Debian/Archlinux
- El código del panel y el entorno de ejecución se instalan automáticamente en el directorio `/opt/mcsmanager/`.

<br />

**Instalación manual de Linux**

- Si la instalación de un clic no funciona, puedes probar este paso para la instalación manual.

```bash
# Cambiar al directorio de instalación. Si no existe, por favor créalo con 'mkdir /opt/' primero.
cd /opt/
# Descargar entorno de ejecución (Node.js). Si ya tienes Node.js 16+ instalado, por favor ignora este paso.
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
# Extraer archivo
tar -xvf node-v20.11.0-linux-x64.tar.xz
# Agregar programa a variables de entorno del sistema.
ln -s /opt/node-v20.11.0-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v20.11.0-linux-x64/bin/npm /usr/bin/npm

# Preparar directorio de instalación.
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Descargar MCSManager.
wget https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz
tar -zxf mcsmanager_linux_release.tar.gz

# Instalar dependencias.
chmod 775 install.sh
./install.sh

# Por favor abre dos terminales o screen.

# Iniciar programa node primero.
./start-daemon.sh

# Iniciar servicio web (en segundo terminal o screen).
./start-web.sh

# Visita http://<IP pública>:23333/ para ver el panel.
# Generalmente, la aplicación web escaneará automáticamente y se conectará al daemon local.
```

Este método de instalación no registra automáticamente el panel en los servicios del sistema, por lo que debes usar software `screen` para gestionarlo. Si quieres que el servicio del sistema tome control de MCSManager, por favor consulta la documentación.

### Mac OS

```bash

# Primero instalar Node.js, si ya lo tienes instalado, puedes saltar este paso.
# Node.js recomienda instalar la última versión LTS.
brew install node
node -v
npm -v

# Usar curl para descargar archivos
curl -L https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz -o mcsmanager_linux_release.tar.gz

# Extraer archivos (mismo comando que el original)
tar -zxf mcsmanager_linux_release.tar.gz

cd mcsmanager

# Instalar dependencias.
chmod 775 install.sh
./install.sh

# Por favor abre dos terminales o screen.

# Iniciar programa node primero.
./start-daemon.sh

# Iniciar servicio web (en segundo terminal o screen).
./start-web.sh

# Visita http://localhost:23333/ para ver el panel.
# Generalmente, la aplicación web escaneará automáticamente y se conectará al daemon local.
```

<br />

## Contribuir Código

- Debe leerse antes de contribuir código: https://github.com/MCSManager/MCSManager/issues/599

- El código necesita mantener el formato existente, no se permite formato excesivo de código.

- Todo el código debe cumplir con los estándares de internacionalización.

<br />

## Desarrollo

Esta sección es para desarrolladores. Si quieres hacer desarrollo secundario en MCSManager o enviar contribuciones de código, por favor lee cuidadosamente estos contenidos:

### Requerido

Usamos `Visual Studio Code` para desarrollar MCSManager. Debes **instalar** estos plugins:

- Soporte de visualización de texto i18n (I18n Ally)
- Formato de código (Prettier)
- Vue - Official
- ESLint

### Archivos de Dependencias

Necesitas ir a los proyectos [PTY](https://github.com/MCSManager/PTY) y [Zip-Tools](https://github.com/MCSManager/Zip-Tools) para descargar archivos binarios adecuados para tu sistema, almacenarlos en el directorio `daemon/lib` (crear manualmente si no existe) para asegurar el funcionamiento normal de `terminal de simulación` y `descompresión de archivos`.

### Ejecución

```bash
git clone https://github.com/MCSManager/MCSManager.git

# MacOS
./install-dependents.sh
./npm-dev-macos.sh

# Windows
./install-dependents.bat
./npm-dev-windows.bat
```

### Internacionalización de Código

Dado que el proyecto se adapta a múltiples idiomas, todos los `strings` y `comentarios` en el código solo aceptan inglés, por lo que por favor no codifiques texto no inglés directamente en el código.

Por ejemplo, podrías escribir una nueva cadena que necesita adaptarse a múltiples idiomas.

```ts
import { $t } from "../i18n";

if (!checkName) {
  const errorMsg = "Check Name Failed!" // ¡No hagas esto!
  const errorMsg = $t("TXT_CODE_MY_ERROR"); // ¡Correcto!
}.
```

```html
<script lang="ts" setup>
  import { t } from "@/lang/i18n";
  // ...
</script>

<template>
  <!-- ... -->
  <a-menu-item key="toNodesPage" @click="toNodesPage()">
    <FormOutlined />
    {{ t("TXT_CODE_NODE_INFO") }}
  </a-menu-item>
</template>
```

Por favor agrega esta línea al archivo de idioma, por ejemplo: `languages/en_US.json`

Entre ellos, `en_US.json` es obligatorio agregar, es el texto fuente para todos los idiomas de países, otros idiomas de países pueden ser traducidos automáticamente por nosotros usando IA.

```json
{
  //...
  "TXT_CODE_MY_ERROR": "Check Name Failed!",
  "TXT_CODE_NODE_INFO": "Jump to Node Page"
}
```

Si has instalado el plugin `I18n Ally`, tu `$t("TXT_CODE_MY_ERROR")` debería mostrar el texto en inglés.

Si el texto de traducción necesita llevar parámetros, esto podría ser un poco complejo, porque el frontend y backend usan diferentes bibliotecas i18n, por lo que el formato podría ser diferente. Necesitas revisar los archivos para encontrar código similar para entender.

¡Todas las claves de texto de traducción no pueden duplicarse, por lo que por favor intenta usar un nombre más largo!

### Construir Versión de Entorno de Producción

```bash
./build.bat # Windows
./build.sh  # MacOS
```

Después de que la construcción esté completa, encontrarás el código del entorno de producción en el directorio `production-code`.

<br />

## Compatibilidad del Navegador

- Soporta navegadores modernos principales como `Chrome` `Firefox` `Safari` `Opera`.
- Ha abandonado el soporte para el navegador `IE`.

<br />

## Reportes de Errores

Bienvenido a reportar cualquier problema encontrado, los corregiremos rápidamente.

Si descubres vulnerabilidades de seguridad graves que son inconvenientes de publicar públicamente, por favor envía un correo electrónico a: support@mcsmanager.com. Después de que los problemas de seguridad sean corregidos, el nombre del descubridor será adjuntado en el código.

<br />

## Licencia

El código fuente sigue la licencia [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

Copyright ©2025 MCSManager.
