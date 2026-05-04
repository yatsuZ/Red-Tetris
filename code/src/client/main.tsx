import { createRoot } from 'react-dom/client'
import App from './App.js'
import {socket} from './socket.js'

socket

createRoot(document.getElementById('root')!).render(<App />)
