import { useToast } from "@/contexts/ToastContext";
import supabase from "@/utils/supabase";

function Profile() {
  const toast = useToast();
  return (
    <div>
      Profile
      <button
        onClick={() => {
          supabase.auth.signOut();
          toast.success("Signed out");
        }}>
        Sign out
      </button>
    </div>
  );
}

export default Profile;
