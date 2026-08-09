import { ColorPicker } from "@/components/ColorPicker";
import Divider from "@/components/Divider";
import { Drawer } from "@/components/Drawer";
import { useSettings } from "@/contexts/SettingsContext";
import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import ProfilePic from "@/components/ProfilePic";
import { useAuth } from "@/contexts/AuthContext";
import { uploadProfilePicture } from "@/utils/supabase";
import { useToast } from "@/contexts/ToastContext";
import "./Settings.css"
import { Icon, Palette, RotateCcw, SettingsIcon, Timer, Upload, User } from "lucide-react";
import Switch from "@/components/Switch";

function Settings() {
  const settings = useSettings();
  const navigate = useNavigate();
  const toast = useToast();

  const auth = useAuth();

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function setProfilePicture(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0] && auth?.user) {
      const success = await uploadProfilePicture(auth.user.id, e.target.files[0]);
      if (success) {
        toast.success("Updated profile picture!");
        auth.reloadUser();
      } else {
        toast.error("Unable to update profile picture.")
      }
    }
  }

  return (
    <Drawer open={true} onClose={() => {
      navigate(-1);
      settings.saveSettings();
    }} side="left">
      <div className="table-row-left-aligned" style={{ marginTop: 70, marginLeft: 60 }}>
        <SettingsIcon size={45}/>
        <h2 style={{ marginLeft: 10, textAlign: "left", fontSize: "40px" }}>Settings</h2>
      </div>
      <Divider />

      <div style={{ marginLeft: 60, marginRight: 60, marginBottom: "40px" }}>
        <div className="popout-container" style={{ backgroundColor: "var(--bg-color)", marginTop: "40px"}}>
          <div className="table-settings-subheading">
            <Palette  size={25}/>
            Appearance
          </div>

          <TableSettingsRow heading="Background color" text="Set the background color for the app.">
            <ColorPicker color={settings.backgroundColor} onColorChange={(e) => {
              settings.setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))
            }}/>
          </TableSettingsRow>
          <Divider />

          <TableSettingsRow heading="Font color" text="Set primary text color.">
            <ColorPicker color={settings.fontColor} onColorChange={(e) => {
              settings.setSettings(prev => ({ ...prev, fontColor: e.target.value }))
            }}/>
          </TableSettingsRow>
          <Divider />

          <TableSettingsRow heading="Accent color" text="Accent color for highlights and actions.">
            <ColorPicker color={settings.accentColor} onColorChange={(e) => {
              settings.setSettings(prev => ({ ...prev, accentColor: e.target.value }))
            }}/>
          </TableSettingsRow>

        </div>

        <div className="popout-container" style={{ backgroundColor: "var(--bg-color)", marginTop: "40px"}}>
          <div className="table-settings-subheading">
            <Timer size={25}/>
            Timer
          </div>
          <TableSettingsRow heading="Timer font size" text="Set the font size for the timer.">
            <input style={{ maxWidth: 60 }} type="number" step="1" value={settings.timerFontSize} onChange={(e) => {
              settings.setSettings(prev => ({ ...prev, timerFontSize: e.target.valueAsNumber }))
            }}/>
          </TableSettingsRow>
          <Divider />

          <TableSettingsRow heading="Wait time" text="How long the spacebar must be held to start timer.\n (in milliseconds)">
            <input style={{ maxWidth: 60 }} type="number" step="1" value={settings.timerWaitTime} onChange={(e) => {
              settings.setSettings(prev => ({ ...prev, timerWaitTime: e.target.valueAsNumber }))
            }}/>
          </TableSettingsRow>
          <Divider />

          <TableSettingsRow heading="Update interval" text="How often the timer updates when running.\n (in milliseconds)">
            <input style={{ maxWidth: 60 }} type="number" step="1" value={settings.timerUpdateInterval} onChange={(e) => {
              settings.setSettings(prev => ({ ...prev, timerUpdateInterval: e.target.valueAsNumber }))
            }}/>
          </TableSettingsRow>

          <Divider />
          <TableSettingsRow heading="Zen mode" text="Times are not recorded, distractions are removed. \n Press esc to exit zen mode.">
            <Switch isChecked={settings.zenMode} handleToggle={(e) => settings.setZenMode(e.target.checked) }/>
          </TableSettingsRow>



        </div>

        <button style={{ margin: "40px 0px" }} onClick={settings.resetSettings}>
          <div className="table-row">
            <RotateCcw size={15} />
            <div style={{ marginLeft: "7px"}}>
              Reset to defaults
            </div>
          </div>
        </button>
        {
          auth?.user &&
          <>
            <div className="popout-container" style={{ backgroundColor: "var(--bg-color)"}}>
              <div className="table-settings-subheading" style={{ marginTop: "20px" }}>
                <User size={25}/>
                Account
              </div>
              <div className="table-row-left-aligned" style={{ margin: 15}}>
                <ProfilePic user={auth.user} size={90}/>
                <button onClick={() => inputRef.current?.click()} style={{ marginLeft: 15, fontSize: "15px" }}>
                  <div className="table-row">
                    <Upload size={15} />
                    <div style={{ marginLeft: "7px"}}>
                      Upload new profile picture
                    </div>
                  </div>
                </button>
              </div>
              <div className="popout-container" style={{ padding: "0px 15px"}}>
                <div className="table-settings-row">
                  <div>Username:</div>
                  <div>{auth.user.username}</div>
                </div>
                <Divider />
                <div className="table-settings-row">
                  <div>Email:</div>
                  <div>{auth.user.email}</div>
                </div>
                <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={setProfilePicture}
                hidden
                />
              </div>
            </div>
          </>
        }
      </div>
    </Drawer>
  )
}

function TableSettingsRow({ heading, text, children} : { heading: string, text: string, children: ReactNode}) {
  const lines = text.split("\\n");
  return (
    <div className="table-settings-row">
      <div style={{ textAlign: "left", maxWidth: "370px"}}>
        <div style={{ fontWeight: "bold"}}>{heading}</div>
        <div style={{ color: "var(--faded-color)", fontSize: "14px" }}>
          {lines.map((line, idx) => (
            <p key={idx}>
              {line}
            </p>
          ))}
        </div>
      </div>
      { children }
    </div>
  )

}

export default Settings;
