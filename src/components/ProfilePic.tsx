import default_avatar from "@/assets/default_avatar.jpg";
import { getProfilePictureURL } from "@/utils/supabase";
import "./ProfilePic.css";

export default function ProfilePic({ user_id, size=50 }: { user_id?: string, size?: number }) {

  return (
    <div className="profile-icon" style={{ width: size, height: size, borderRadius: size/2 }}>
      <img
      src={user_id ? getProfilePictureURL(user_id) : default_avatar}
      // If image fails to load pfp, load default avatar
      onError={(e) => {
        e.currentTarget.src = default_avatar;
      }}
      width={size}
      height={size} />
    </div>
  )
}
