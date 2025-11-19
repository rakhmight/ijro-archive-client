import { FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import './assets/css/general.css'
import GeneralLayout from './components/layouts/general-layout/GeneralLayout'
import { useActions } from './hooks/use-actions/UseActions'

const App: FC = () => {
  const { setSessionID, setSessionToken } = useActions()

  const [ showUI, setShowUI ] =  useState(false)

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID')
    const sessionToken = localStorage.getItem('sessionToken')

    if(sessionID && sessionToken){      
      setSessionID(sessionID)
      setSessionToken(sessionToken)
    }

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
