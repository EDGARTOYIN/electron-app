/* eslint-disable react/prop-types */

export default function VideoPlay({ videoPath, onVideoLoaded, onVideoError }) {
  return (
    <video autoPlay onLoadedData={onVideoLoaded} onError={onVideoError} width="600" className="">
      <source src={`animation:///${videoPath}`} type="video/mp4" />
    </video>
  )
}
