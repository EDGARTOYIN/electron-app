# electron-app

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

### Para poder ejecutar el proyecto necesita:

- Instalar la version mas nueva de nodeJS
- Cambiar al directorio del proyecto con "cd ".\electron-app\"

"Para instalas las dependencias del proyecto"
```bash
$ npm install
```

### Development ejectuar el programa

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### NOTE

If you are using Windows 11 o 10, you will probably trigger windows widgets with certain gestures.
You can disable them using this:

```bash
Utilicé Windows+R, escribí "regedit" => navegar a "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\LockDown\AllowEdgeSwipe" => cambiar 'valor' a '0' = > reinicie el dispositivo y no más deslizamientos de borde.
```
