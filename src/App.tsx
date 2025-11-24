import { FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import './assets/css/general.css'
import GeneralLayout from './components/layouts/general-layout/GeneralLayout'

const App: FC = () => {

  const [ showUI, setShowUI ] =  useState(false)

  useEffect(() => {
    setShowUI(true)
  }, [])

  return (
    <BrowserRouter>
      <GeneralLayout>
        {
          showUI && (
            <AppRoutes />
          )
        }
      </GeneralLayout>
    </BrowserRouter>
  )
}

export default App
