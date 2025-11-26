import { FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import './assets/css/general.css'
import GeneralLayout from './components/layouts/general-layout/GeneralLayout'
import { useActions } from './hooks/use-actions/UseActions'

const App: FC = () => {

  const { changeIsMobile } = useActions()
  const [ showUI, setShowUI ] =  useState(false)

  useEffect(() => {
    
      window.addEventListener("resize", () => {
          if(document.body.clientWidth < 1040) changeIsMobile(true)
          else changeIsMobile(false)
      })

      if(document.body.clientWidth < 1040) changeIsMobile(true)
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
