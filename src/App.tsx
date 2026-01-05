import { Route, Routes } from 'react-router-dom';
import Timer from '@/pages/Timer/Timer';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Timer />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="*" element={<NotFound />} /> {/* catch-all */}
    </Routes>
  )
}

export default App;
