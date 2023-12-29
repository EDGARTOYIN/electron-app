function getFilePath(relativePath) {
  const currentScriptPath = new URL(import.meta.url).pathname
  return `.${currentScriptPath}/${relativePath}`
}

export { getFilePath }
