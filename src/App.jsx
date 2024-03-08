import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'
import Home from './Pages/Home'


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<RootLayout/>} >
        <Route index element={<Home/>}/>
      </Route>
  )
)


function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
