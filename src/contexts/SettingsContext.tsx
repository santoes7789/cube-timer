import { createContext, useContext, useState, type ReactNode, } from "react"

const localSettingsKey = "userSettings";

export type Settings = {
  timerWaitTime: number;
  timerUpdateInterval: number;
}

type SettingsContextType = Settings & {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  resetSettings: () => void;
  saveSettings: () => void;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;
  zenMode: boolean,
};

export const defaultSettings  = {
  timerWaitTime: 400,
  timerUpdateInterval: 14,
};

const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  setSettings: () => { },
  resetSettings: () => { },
  saveSettings: () => { },
  setZenMode: () => { },
  zenMode: false,
});

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("SettingsContext missing");
  return ctx;
};

export default function SettingsProvider({ children } : { children: ReactNode}) {
  // Get default value from local storage
  const [settings, setSettings] = useState<Settings>(getLocalSettings);
  const [zenMode, setZenMode] = useState(false);

  // Get local settings
  function getLocalSettings() {
    const stored = localStorage.getItem(localSettingsKey);
    return stored ? JSON.parse(stored) : defaultSettings;
  }

  // Resets current settings to default
  function resetSettings() {
    setSettings(defaultSettings);
  }

  // function to save current user settings
  function saveUserSettings() {
    localStorage.setItem(localSettingsKey, JSON.stringify(settings));
  }


  return (
    <SettingsContext value={{
      ...settings,
      setSettings,
      resetSettings,
      saveSettings: saveUserSettings,
      zenMode,
      setZenMode,
    }}>
      {children}
    </SettingsContext>
  )
}
