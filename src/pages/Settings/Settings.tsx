import { ColorPicker } from "@/components/ColorPicker";
import Divider from "@/components/Divider";
import { Drawer } from "@/components/Drawer";
import { useSettings } from "@/contexts/SettingsContext";
import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import ProfilePic from "@/components/ProfilePic";
import { useAuth } from "@/contexts/AuthContext";
import { uploadProfilePicture } from "@/utils/supabase";
import { useToast } from "@/contexts/ToastContext";
import "./Settings.css";

function Settings() {
  const settings = useSettings();
  const navigate = useNavigate();
  const toast = useToast();

  const auth = useAuth();

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function setProfilePicture(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0] && auth) {
      const success = await uploadProfilePicture(auth.user.id, e.target.files[0]);
      if (success) {
        toast.success("Updated profile picture!");
      } else {
        toast.error("Unable to update profile picture.")
      }
    }
  }

  return (
    <Drawer open={true} onClose={() => navigate("/timer")} side="left">
      <h2 style={{ marginTop: 70, marginLeft: 40, textAlign: "left" }}>Settings</h2>
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

        {
          auth &&
          <>
            <div className="table-settings-subheading">Account</div>
            <div className="table-settings-row">
              <ProfilePic user_id={auth.user.id} size={100}/>
              <button onClick={() => inputRef.current?.click()}>Upload new profile picture</button>
            </div>
            <div className="table-settings-row">
              <div>Username</div>
            </div>
            <div className="table-settings-row">
              <div>Email</div>
            </div>
            <div className="table-settings-row">
              <div>Password</div>
            </div>
            <input type="file"
              accept="image/*"
              ref={inputRef}
              onChange={setProfilePicture}
              hidden
            />
          </>
        }
      </div>
    </Drawer>
  )
}

export default Settings;
