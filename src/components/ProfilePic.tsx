import default_avatar from "@/assets/default_avatar.jpg";
import { getProfilePictureURL } from "@/utils/supabase";
import type { User } from "@/types";
import type { CSSProperties } from "react";
import "./ProfilePic.css";

export default function ProfilePic({ user, size = 50, clickable = false }: { user?: User, size?: number, clickable?: boolean }) {

  return (
    <div className={`profile-icon${clickable ? " clickable" : ""}`} style={{ width: size, height: size, borderRadius: size }}>
      <img
      src={user ? getProfilePictureURL(user) : default_avatar}
      // If image fails to load pfp, load default avatar
      onError={(e) => {
        e.currentTarget.src = default_avatar;
      }}
      width={size}
      height={size} />
    </div>
  )
}
