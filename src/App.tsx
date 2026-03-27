import { createBrowserRouter } from 'react-router'
import { Home } from './Pages/Home'
import { Cart } from './Pages/Cart'
import { Detail } from './Pages/Detail'
import { Layout } from './Components/Layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/products/:id",
        element: <Detail/>

      }
    ]
  }
])

export { router }
