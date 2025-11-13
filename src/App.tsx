import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './login/pantallaLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}>
      <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
