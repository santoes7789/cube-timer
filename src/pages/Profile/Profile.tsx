import supabase from "@/utils/supabase";

function Profile() {
  return (
    <div>
      Profile
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </div>
  )
}

export default Profile;