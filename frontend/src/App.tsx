import { Layout } from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App
