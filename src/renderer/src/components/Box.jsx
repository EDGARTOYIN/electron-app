/* eslint-disable prettier/prettier */
// eslint-disable-next-line react/prop-types
export default function Box({ styleBox, clickBox }) {
  return <div style={{ backgroundColor: styleBox }} onClick={clickBox}></div>
}
