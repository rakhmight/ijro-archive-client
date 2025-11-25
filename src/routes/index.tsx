import { Route, Routes } from 'react-router-dom'
import AuthView from '../views/auth-view/AuthView'
import StorageView from '../views/storage-view/StorageView'
import NotFound from '../views/404-view/NotFoundView'

const AppRoutes = () => (
    <Routes>
      <Route path='/' element={<AuthView />} />
      <Route path='/' element={<StorageView />} />
      <Route path='/storage' element={<StorageView />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    
)
  
export default AppRoutes