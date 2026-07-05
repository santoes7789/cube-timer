import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"

type Settings = {
  darkMode: boolean;
  backgroundColor: string;
  accentColor: string;

  timerWaitTime: number;
  timerUpdateInterval: number;
}

type SettingsContextType = Settings & {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const defaultSettings  = {
  darkMode: true,
  backgroundColor: "#2c303d",
  accentColor: "#2c303d",
  timerWaitTime: 400,
  timerUpdateInterval: 8,
};

const SettingsContext = createContext<SettingsContextType>({ ...defaultSettings, setSettings: () => {}});

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("SettingsContext missing");
  return ctx;
};

export default function SettingsProvider({ children } : { children: ReactNode}) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', settings.backgroundColor);
  }, [settings]);
  return (
    <SettingsContext value={{...settings, setSettings}}>
      {children}
    </SettingsContext>
  )
}