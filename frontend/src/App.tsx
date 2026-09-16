import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegiserSuccess'
import ShopPage from './pages/ShopPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <>
    <Toaster richColors position="top-center" dir="rtl" />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

export default App
