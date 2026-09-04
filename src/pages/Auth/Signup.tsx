import Divider from "@/components/Divider";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { signup } from "@/utils/supabase";
import { type formStates } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { BackIcon } from "@/components/BackIcon";
import { useAuth } from "@/contexts/AuthContext";

// Signup page
function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", repeatPassword: "", username: "" });
  const [state, setState] = useState<formStates>("idle");

  // Hooks to be used
  const navigate = useNavigate();
  const toast = useToast();
  const auth = useAuth();

  // Function to handle signup
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    setState("submitting");

    const success = await signup({
      email: formData.email,
      password: formData.password,
      username: formData.username
    })

    auth?.reloadUser();

    if (success) {
      navigate("/");
      console.log("account created")
      toast.success("Account created!");
      setState("loading");
    } else {
      console.log("failed to create account")
      toast.error("Failed to create account");
      setState("idle");
    }
  };

  // Function to handle when one of the fields change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // All fields need to be not null, and two password fields must be the same
  const valid =
    formData.email && formData.username && formData.password && formData.password === formData.repeatPassword;

  return (
    <div className="auth-page-container">
      <BackIcon />
      <div className="popout-container auth-block" style={{ backgroundColor: "var(--bg-dark)"}}>
        <form method="post" onSubmit={handleSignup} className="auth-container">
          {/*Heading*/}
          <div>
            <h2>Sign up</h2>
            Create a new account
          </div>

          <Divider />

          {/*Fields*/}
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
            <label htmlFor="email">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              disabled={state === "submitting"}
              placeholder="aBuffaloHerd"
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

          <div>
            <div>
              <label htmlFor="repeat-password">Repeat Password</label>
            </div>
            <input
              id="repeat-password"
              name="repeatPassword"
              value={formData.repeatPassword}
              disabled={state === "submitting"}
              onChange={handleChange}
              type="password"
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={!valid || state === "submitting"}>
            Sign up
          </button>
          <div className="text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
