import { Route, Routes } from 'react-router-dom';
import Timer from '@/pages/Timer/Timer';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Timer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="*" element={<NotFound />} /> {/* catch-all */}
    </Routes>
  )
}

export default App;
