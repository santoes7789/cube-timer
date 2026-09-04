import default_avatar from "@/assets/default_avatar.jpg";
import { getProfilePictureURL } from "@/utils/supabase";
import type { User } from "@/types";
import type { CSSProperties } from "react";
import "./ProfilePic.css";

// Profile picture component, displays the user's profile picture
export default function ProfilePic({ user, size = 50, clickable = false, onClick }: { user?: User, size?: number, clickable?: boolean, onClick?: () => void }) {

  // Retrieve user's profile picture and displays it in a circle border
  return (
    <div
      className={`profile-icon${clickable ? " clickable" : ""}`}
      style={{ width: size, height: size, borderRadius: size }}
      onClick={onClick}
    >
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
