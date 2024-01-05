# electron-app

An Electron application with

- React
- Tailwind CSS
- ELECTRON JS

### Summary

Es una aplicacion hecha con react que realiza multiples test basicos para probar las funcionalidades de la computadora en escenarios especificos:

- Touch Screen
- Touch Pad
- Camara
- Audio
- Teclado
- Wifi
- Pixeles

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

### Para poder ejecutar el proyecto necesita:

- Instalar la version mas nueva de nodeJS
- Instalar las dependencias del proyecto
- Cambiar al directorio del proyecto con "cd ".\electron-app\"

"Para instalas las dependencias del proyecto"

```bash
$ cd ./electron-app/
$ npm install
```

### Development ejectuar el programa

```bash
$ cd ./electron-app/
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

Test: TouchScren
If you are using Windows 11 o 10, you will probably trigger windows widgets with certain gestures (even if you are full screen).
You can disable them using this:
Test: Wifi
This test was configured with a webService with FastApi that runs a python APP to conect to a specific network

```bash
 Windows+R, escribí "regedit" => navegar a "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\LockDown\AllowEdgeSwipe" => cambiar 'valor' a '0' = > reinicie el dispositivo y no más deslizamientos de borde.
```
