import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLs', () => {
      reset()
    })
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLs', () => {
        reset()
      })
    }
  }, [reset])
  return (
    <div>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App
