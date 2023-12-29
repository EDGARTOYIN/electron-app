import VideoPlay from './VideoPlay'

export default function AudioTestContent({
  videoPath,
  handleVideoLoaded,
  handleVideoError,
  isLoading,
  isError,
  mainOutput,
  device
}) {
  return (
    <div className="h-screen grid place-items-center max-w-[70rem] mx-auto relative">
      {isLoading && <div className="text-xl font-bold absolute text-center">Cargando...</div>}
      {isError && (
        <div className="text-xl font-bold absolute text-center">Error al cargar el video</div>
      )}
      <div>Dispositivo siendo probado: {device}</div>
      <VideoPlay
        videoPath={videoPath}
        onVideoLoaded={handleVideoLoaded}
        onVideoError={handleVideoError}
      />
      <p className="text-xl mb-6">{mainOutput}</p>
    </div>
  )
}
