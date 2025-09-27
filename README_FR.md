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
[日本語](README_JP.md) - [Spanish](README_ES.md) - [Thai](README_TH.md) - [Français](README_FR.md)

</div>

<br />

## Qu'est-ce que c'est ?

**MCSManager Panel** (abréviation : MCSM Panel) est un panneau d'administration web moderne, simple, multi-utilisateur, compatible avec l'architecture distribuée et à déploiement rapide pour les serveurs de jeux Minecraft et Steam.

MCSManager a gagné en popularité dans les communautés de jeux `Minecraft` et `Steam`. Il vous aide à gérer centralement plusieurs serveurs physiques, vous permet de créer des serveurs de jeux sur n'importe quel hôte, et fournit un système de permissions multi-utilisateur sécurisé et fiable qui peut facilement vous aider à gérer plusieurs serveurs. Il a fourni un support logiciel sain aux administrateurs, au personnel d'exploitation et aux développeurs individuels de serveurs de jeux `Minecraft`, `Terraria` et `Steam`.

Il convient également à toute activité commerciale, comme les fournisseurs de services IDC pour la vente de serveurs privés, etc. Plusieurs petites et moyennes entreprises utilisent déjà ce panneau comme logiciel de gestion et de vente, et il prend en charge les langues de **plusieurs pays**.

<img width="3164" height="2060" alt="1" src="https://github.com/user-attachments/assets/570d2447-66dc-4c0b-b2d2-4c3176b51d67" />

<img width="1871" height="1342" alt="terminal" src="https://github.com/user-attachments/assets/7f6ed988-e402-4347-94ee-a0469f6658da" />

<img width="3164" height="2060" alt="3" src="https://github.com/user-attachments/assets/2722cf9f-de9b-4630-b0ea-c00283791d8d" />

<img width="3164" height="2060" alt="4" src="https://github.com/user-attachments/assets/c7a3165c-466b-42c5-b75a-16ada603b1da" />

<br />

## Fonctionnalités

1. Utilisez le marché d'applications pour déployer facilement des serveurs de jeux `Minecraft` ou `Steam` en un clic.
2. Compatible avec la plupart des serveurs de jeux `Steam`, comme `Palworld`, `Squad`, `Project Zomboid` et `Terraria`, etc.
3. L'interface web prend en charge la mise en page de cartes glisser-déposer pour créer votre mise en page d'interface préférée.
4. Prend en charge toutes les images sur `Docker Hub`, prend en charge multi-utilisateur, prend en charge les services de vente d'instances commerciales.
5. Prend en charge l'architecture distribuée, une interface web peut gérer plusieurs machines simultanément.
6. Pile technologique simple, vous n'avez besoin que de maîtriser TypeScript pour terminer tout le développement MCSManager !
7. Plus...

<br />

## Environnement d'exécution

Le panneau de contrôle peut s'exécuter sur les plateformes `Windows` et `Linux`, aucune installation de base de données requise, vous n'avez besoin que d'installer l'environnement `Node.js` et plusieurs **commandes de décompression**.

Vous devez utiliser [Node.js 16.20.2](https://nodejs.org/en) ou supérieur, nous recommandons d'utiliser la dernière version LTS.

<br />

## Installation

### Windows

Téléchargement : https://download.mcsmanager.com/mcsmanager_windows_release.zip

Démarrer le panneau :

```bash
start.bat
```

<br />

### Linux

**Commande d'une ligne pour installation rapide**

```bash
sudo su -c "wget -qO- https://script.mcsmanager.com/setup.sh | bash"
```

**Utilisation après installation**

```bash
systemctl start mcsm-{web,daemon} # Démarrer le panneau
systemctl stop mcsm-{web,daemon}  # Arrêter le panneau
```

- Le script ne s'applique qu'à Ubuntu/Centos/Debian/Archlinux
- Le code du panneau et l'environnement d'exécution sont installés automatiquement dans le répertoire `/opt/mcsmanager/`.

<br />

**Installation manuelle Linux**

- Si l'installation en un clic ne fonctionne pas, vous pouvez essayer cette étape pour l'installation manuelle.

```bash
# Passer au répertoire d'installation. S'il n'existe pas, veuillez le créer avec 'mkdir /opt/' d'abord.
cd /opt/
# Télécharger l'environnement d'exécution (Node.js). Si vous avez déjà Node.js 16+ installé, veuillez ignorer cette étape.
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
# Extraire l'archive
tar -xvf node-v20.11.0-linux-x64.tar.xz
# Ajouter le programme aux variables d'environnement système.
ln -s /opt/node-v20.11.0-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v20.11.0-linux-x64/bin/npm /usr/bin/npm

# Préparer le répertoire d'installation.
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Télécharger MCSManager.
wget https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz
tar -zxf mcsmanager_linux_release.tar.gz

# Installer les dépendances.
chmod 775 install.sh
./install.sh

# Veuillez ouvrir deux terminaux ou screen.

# Démarrer d'abord le programme node.
./start-daemon.sh

# Démarrer le service web (dans le deuxième terminal ou screen).
./start-web.sh

# Visitez http://<IP publique>:23333/ pour voir le panneau.
# Généralement, l'application web scannera automatiquement et se connectera au démon local.
```

Cette méthode d'installation n'enregistre pas automatiquement le panneau aux services système, vous devez donc utiliser le logiciel `screen` pour le gérer. Si vous voulez que le service système prenne en charge MCSManager, veuillez consulter la documentation.

### Mac OS

```bash

# D'abord installer Node.js, si vous l'avez déjà installé, vous pouvez ignorer cette étape.
# Node.js recommande d'installer la dernière version LTS.
brew install node
node -v
npm -v

# Utiliser curl pour télécharger les fichiers
curl -L https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz -o mcsmanager_linux_release.tar.gz

# Extraire les fichiers (même commande que l'original)
tar -zxf mcsmanager_linux_release.tar.gz

cd mcsmanager

# Installer les dépendances.
chmod 775 install.sh
./install.sh

# Veuillez ouvrir deux terminaux ou screen.

# Démarrer d'abord le programme node.
./start-daemon.sh

# Démarrer le service web (dans le deuxième terminal ou screen).
./start-web.sh

# Visitez http://localhost:23333/ pour voir le panneau.
# Généralement, l'application web scannera automatiquement et se connectera au démon local.
```

<br />

## Contribution de code

- Doit être lu avant de contribuer au code : https://github.com/MCSManager/MCSManager/issues/599

- Le code doit maintenir le format existant, le formatage excessif du code n'est pas autorisé.

- Tout le code doit respecter les normes d'internationalisation.

<br />

## Développement

Cette section est pour les développeurs. Si vous voulez faire du développement secondaire sur MCSManager ou soumettre des contributions de code, veuillez lire attentivement ces contenus :

### Requis

Nous utilisons `Visual Studio Code` pour développer MCSManager. Vous devez **installer** ces plugins :

- Support d'affichage de texte i18n (I18n Ally)
- Formatage de code (Prettier)
- Vue - Official
- ESLint

### Fichiers de dépendances

Vous devez aller aux projets [PTY](https://github.com/MCSManager/PTY) et [Zip-Tools](https://github.com/MCSManager/Zip-Tools) pour télécharger les fichiers binaires appropriés pour votre système, les stocker dans le répertoire `daemon/lib` (créer manuellement s'il n'existe pas) pour assurer le fonctionnement normal du `terminal de simulation` et de la `décompression de fichiers`.

### Exécution

```bash
git clone https://github.com/MCSManager/MCSManager.git

# MacOS
./install-dependents.sh
./npm-dev-macos.sh

# Windows
./install-dependents.bat
./npm-dev-windows.bat
```

### Internationalisation du code

Comme le projet s'adapte à plusieurs langues, toutes les `chaînes` et `commentaires` dans le code n'acceptent que l'anglais, veuillez donc ne pas coder du texte non-anglais directement dans le code.

Par exemple, vous pourriez écrire une nouvelle chaîne qui doit s'adapter à plusieurs langues.

```ts
import { $t } from "../i18n";

if (!checkName) {
  const errorMsg = "Check Name Failed!" // Ne faites pas ça !
  const errorMsg = $t("TXT_CODE_MY_ERROR"); // Correct !
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

Veuillez ajouter cette ligne au fichier de langue, par exemple : `languages/en_US.json`

Parmi eux, `en_US.json` est obligatoire à ajouter, c'est le texte source pour toutes les langues de pays, les autres langues de pays peuvent être traduites automatiquement par nous en utilisant l'IA.

```json
{
  //...
  "TXT_CODE_MY_ERROR": "Check Name Failed!",
  "TXT_CODE_NODE_INFO": "Jump to Node Page"
}
```

Si vous avez installé le plugin `I18n Ally`, votre `$t("TXT_CODE_MY_ERROR")` devrait afficher le texte anglais.

Si le texte de traduction doit porter des paramètres, cela pourrait être un peu complexe, car le frontend et le backend utilisent des bibliothèques i18n différentes, donc le format pourrait être différent. Vous devez regarder à travers les fichiers pour trouver du code similaire pour comprendre.

Toutes les clés de texte de traduction ne peuvent pas être dupliquées, veuillez donc essayer d'utiliser un nom plus long !

### Construire la version d'environnement de production

```bash
./build.bat # Windows
./build.sh  # MacOS
```

Après la construction terminée, vous trouverez le code d'environnement de production dans le répertoire `production-code`.

<br />

## Compatibilité du navigateur

- Prend en charge les navigateurs modernes principaux comme `Chrome` `Firefox` `Safari` `Opera`.
- A abandonné le support pour le navigateur `IE`.

<br />

## Rapports de bugs

Bienvenue pour signaler tout problème trouvé, nous les corrigerons rapidement.

Si vous découvrez des vulnérabilités de sécurité graves qui sont gênantes à publier publiquement, veuillez envoyer un e-mail à : support@mcsmanager.com. Après que les problèmes de sécurité soient corrigés, le nom du découvreur sera attaché dans le code.

<br />

## Licence

Le code source suit la licence [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

Copyright ©2025 MCSManager.
