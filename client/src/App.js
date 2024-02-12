import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import MyCalendar from './pages/Calendar'
import Employees from './pages/Employees'
import NoPage from './pages/NoPage'



export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path="/calendar" element={<MyCalendar/>} />
            <Route path="/employees" element={<Employees />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}