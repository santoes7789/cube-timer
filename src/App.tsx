import { Route, Routes } from 'react-router-dom';
import Timer from '@/pages/Timer/Timer';
import TimesProvider from '@/contexts/TimesContext';
import './App.css'

function App() {
  return (
    <TimesProvider>
      <Routes>
        <Route path="/" element={<Timer />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="*" element={<NotFound />} /> {/* catch-all */}
      </Routes>
    </TimesProvider>
  )
}

export default App;
