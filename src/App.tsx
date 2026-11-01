import './App.css'
import DBProvider from './contexts/DBContext';
import SettingsProvider from './contexts/SettingsContext';
import Timer from './pages/Timer/Timer';

function App() {

  return (
    <>
      <SettingsProvider>
        <DBProvider>
          <Timer />
        </DBProvider>
      </SettingsProvider>
    </>
  )
}

export default App;
