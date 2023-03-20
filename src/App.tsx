import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  const routeElements = useRouteElement()

  return (
    <div>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App
