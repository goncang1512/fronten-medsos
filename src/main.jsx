import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Geographic from './components/pages/nationalgeographic.jsx'
import Register from './components/pages/register.jsx'
import Login from './components/pages/login.jsx'
import Profil from './components/pages/profil.jsx'
import Upload from './components/pages/upload.jsx'
import Explore from './components/pages/explore.jsx'
import EditProfil from './components/pages/editProfil.jsx'
import EditContent from './components/pages/editContent.jsx'
import Setting from './components/pages/setting.jsx'
import Chat from './components/pages/chat.jsx'
import UserProfil from './components/pages/userProfil.jsx'
import './index.css'
import axios from 'axios'

axios.defaults.withCredentials = true

const router = createBrowserRouter([
  {
    path: "/",
    element: <Geographic/>,
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/profil',
    element: <Profil/>
  },
  {
    path: '/upload/:id',
    element: <Upload/>
  }, 
  {
    path: '/explore',
    element: <Explore/>
  },
  {
    path: '/editprofil/:id',
    element: <EditProfil/>
  }, 
  {
    path: '/editcontent/:id',
    element: <EditContent/>
  },
  {
    path: '/chat',
    element: <Chat/>
  },
  {
    path: '/setting/:id',
    element: <Setting/>
  }, 
  {
    path: '/userprofil/:id',
    element: <UserProfil/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>
)
