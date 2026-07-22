import default_avatar from "@/assets/default_avatar.jpg";
import { getProfilePictureURL } from "@/utils/supabase";
import "./ProfilePic.css";
import type { User } from "@/types";

export default function ProfilePic({ user, size=50 }: { user?: User, size?: number }) {

  return (
    <div className="profile-icon" style={{ width: size, height: size, borderRadius: size/2 }}>
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
