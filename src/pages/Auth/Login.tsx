import Divider from "@/components/Divider";
import "./Auth.css";
import { Link, useNavigate } from "react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import supabase from "@/utils/supabase";
import { type formStates } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { BackIcon } from "@/components/BackIcon";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [state, setState] = useState<formStates>("idle");

  const navigate = useNavigate();

  const toast = useToast();

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    setState("submitting");
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
      if (error.status == 400) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Failed to log in");
      }
      setState("idle");
    } else {
      navigate("/");
      toast.success("Logged in");
      setState("loading");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const valid = formData.email && formData.password;

  return (
    <div className="auth-page-container">
        <BackIcon />
      <div className="popout-container auth-block">
        <form method="post" onSubmit={handleSignin} className="auth-container">
          <div>
            <h2>Login</h2>
          </div>

          <Divider />

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={state === "submitting"}
              placeholder="a@example.com"
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              name="password"
              value={formData.password}
              disabled={state === "submitting"}
              onChange={handleChange}
              type="password"
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={!valid || state === "submitting"}>
            Login
          </button>
          <div className="text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="link">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
