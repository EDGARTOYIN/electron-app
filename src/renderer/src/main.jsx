/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import TouchPad from './components/TouchPad'
import AudioTest from './components/AudioTest'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TouchPad />
  </React.StrictMode>
)
