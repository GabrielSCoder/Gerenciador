import './App.css'
import CriarCliente from './pages/Cliente/CriarCliente';
import Router from './routes'
import { ToastContainer } from 'react-toastify';

function App() {

  const menu = window.localStorage.getItem("menuaberto")
  if (!menu) window.localStorage.setItem("menuaberto", "false")
 
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router />
    </>
  )
}

export default App
