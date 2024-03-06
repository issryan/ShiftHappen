import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import MyCalendar from './pages/Schedule'
import Employees from './pages/Employee/Employees'
import Login from './pages/Login/Login'
import NoPage from './pages/NoPage'



export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/schedule" element={<MyCalendar/>} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}