/* eslint-disable prettier/prettier */
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import nodeDiskInfo from 'node-disk-info'
import fs from 'fs'
import path from 'path'

const FILE_TO_SEND_PATH = '../../resources/COSTA RICA IN 4K 60fps HDR (ULTRA HD).mp4'

// Funciones relacionadas con el disco que deseas exponer
const diskInfoFunctions = {
  getDiskInfo: () => {
    return new Promise((resolve, reject) => {
      try {
        const diskInfo = nodeDiskInfo.getDiskInfoSync()
        resolve(diskInfo)
      } catch (error) {
        reject(error)
      }
    })
  },
  sendFileToDrives: () => {
    return new Promise((resolve, reject) => {
      try {
        // Obtener información sobre los discos
        const disks = nodeDiskInfo.getDiskInfoSync()

        // Ruta al archivo que deseas enviar a cada unidad
        const filePath = path.resolve(__dirname, FILE_TO_SEND_PATH)
        const fileContent = fs.readFileSync(filePath)

        disks.forEach((disk) => {
          const destinationPath = path.join(disk.mounted, 'RECONEXT_TEST')

          // Verificar si el directorio existe y, en ese caso, borrarlo
          if (fs.existsSync(destinationPath)) {
            fs.rmdirSync(destinationPath, { recursive: true })
          }

          // Crear el directorio
          fs.mkdirSync(destinationPath)

          // Copiar el archivo al directorio en la unidad
          const destinationFilePath = path.join(destinationPath, path.basename(filePath))
          fs.writeFileSync(destinationFilePath, fileContent)

          resolve(`Archivo enviado a la unidad en: ${destinationPath}`)
        })

        resolve('Archivos enviados con éxito a las unidades.')
      } catch (error) {
        console.error('Error al enviar archivos:', error)
        reject('Error al enviar archivos a las unidades.')
      }
    })
  }
}

// Objeto API que se expondrá al renderizador
const api = {
  diskInfo: diskInfoFunctions
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
