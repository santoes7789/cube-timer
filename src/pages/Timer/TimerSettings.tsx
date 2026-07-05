import { ColorPicker } from "@/components/ColorPicker";
import Divider from "@/components/Divider";
import { Drawer } from "@/components/Drawer";
import Switch from "@/components/Switch";
import { useSettings } from "@/contexts/SettingsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TimerSettings({ }) {
  const [switchState, setSwitch] = useState(false);

  const settings = useSettings();
  const navigate = useNavigate();
  return (
    <Drawer open={true} onClose={() => navigate("/timer")} side="left">
      <h2 style={{ marginTop: 70, marginLeft: 40, textAlign: "left" }}>Timer Settings</h2>
      <Divider />

      <div style={{ marginLeft: 60, marginRight: 60 }}>
        <div className="table-settings-subheading">Appearance</div>
        <div className="table-settings-row">
          <div>Background color</div>
          <ColorPicker color={settings.backgroundColor} onColorChange={(e) => {
            settings.setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))
          }}
          />
        </div>

        <div className="table-settings-subheading">Timer</div>
        <div className="table-settings-row">
          <div>Wait time</div>
          <input style={{ maxWidth: 60 }} type="number" step="1" value={settings.timerWaitTime} onChange={(e) => {
            settings.setSettings(prev => ({ ...prev, timerWaitTime: e.target.valueAsNumber }))
          }}/>
        </div>
        <div className="table-settings-row">
          <div>Update interval</div>
          <input style={{ maxWidth: 60 }} type="number" step="1" value={settings.timerUpdateInterval} onChange={(e) => {
            settings.setSettings(prev => ({ ...prev, timerUpdateInterval: e.target.valueAsNumber }))
          }}/>
        </div>
      </div>
    </Drawer>
  )
}