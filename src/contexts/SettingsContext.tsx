import { getSettings, saveSettings } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState, type ReactNode, } from "react"
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const localSettingsKey = "userSettings";

export type Settings = {
  darkMode: boolean;

  backgroundColor: string;
  accentColor: string;
  fontColor: string;

  timerFontSize: number;
  timerWaitTime: number;
  timerUpdateInterval: number;
}

type SettingsContextType = Settings & {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  resetSettings: () => void;
  saveSettings: () => void;
};

const defaultSettings  = {
  darkMode: true,
  backgroundColor: "#2c303d",
  fontColor: "#FFFFFFDE",
  accentColor: "#0081ff",
  timerWaitTime: 400,
  timerUpdateInterval: 8,
  timerFontSize: 96,
};

const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  setSettings: () => { },
  resetSettings: () => { },
  saveSettings: () => { }
});

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("SettingsContext missing");
  return ctx;
};

export default function SettingsProvider({ children } : { children: ReactNode}) {

  // Get default value from local storage
  const [settings, setSettings] = useState<Settings>(getLocalSettings);

  const auth = useAuth();
  const toast = useToast();

  function getLocalSettings() {
    const stored = localStorage.getItem(localSettingsKey);
    return stored ? JSON.parse(stored) : defaultSettings;
  }


  // Changes css settings immediately when settings changes
  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', settings.backgroundColor);
    document.documentElement.style.setProperty('--highlight-color', settings.accentColor);
    document.documentElement.style.setProperty('--timer-font-size', `${settings.timerFontSize}px`);
    document.documentElement.style.setProperty('--font-color', settings.fontColor);
  }, [settings]);

  useEffect(() => {
    // Gets settings from supabase
    async function getSavedSettings() {
      if (auth?.session) {
        const savedSettings = await getSettings(auth.session.user.id);
        if (savedSettings) {
          setSettings(savedSettings);
        } else {
          toast.error("Could not load your settings. Falling back to default settings");
          setSettings(defaultSettings);
        }
        const stored = localStorage.getItem(localSettingsKey);
        return stored ? JSON.parse(stored) : defaultSettings;
      } else {
        setSettings(getLocalSettings());
      }
    }
    getSavedSettings();
  }, [auth?.session])

  function resetSettings() {
    setSettings(defaultSettings);
  }

  function saveUserSettings() {
    if (auth?.user?.id) {
      saveSettings(settings, auth.user.id);
    } else {
      localStorage.setItem(localSettingsKey, JSON.stringify(settings));
    }
  }


  return (
    <SettingsContext value={{
      ...settings,
      setSettings,
      resetSettings,
      saveSettings: saveUserSettings
    }}>
      {children}
    </SettingsContext>
  )
}
