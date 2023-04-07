import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/RegisterLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layout/CartLayout'
import UserLayout from './pages/User/layouts/LayoutUser'
import ChangePassword from './pages/User/ChangePassword'
import HistoryPurchase from './pages/User/HistoryPurchase'
import Profile from './pages/User/Profile'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.user,
      element: (
        <MainLayout>
          <UserLayout />
        </MainLayout>
      ),
      children: [
        {
          path: path.profile,
          element: <Profile />
        },
        {
          path: path.changePassword,
          element: <ChangePassword />
        },
        {
          path: path.historyPurchase,
          element: <HistoryPurchase />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
