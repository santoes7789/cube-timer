import Divider from "@/components/Divider";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { type formStates } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { BackIcon } from "@/components/BackIcon";
import { signup } from "@/utils/supabase";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", repeatPassword: "" });
  const [state, setState] = useState<formStates>("idle");

  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    setState("submitting");

    const { error } = await signup({
      email: formData.email.toLowerCase(),
      password: formData.password,
    })

    if (error) {
      toast.error(error.message);
      setState("idle");
      return;
    }
    navigate("/");
    toast.success("Account created!");
    setState("loading");
  };

  // Function to handle when one of the fields change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // All fields need to be not null, and two password fields must be the same
  const valid =
    formData.email && formData.password && formData.password === formData.repeatPassword;

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
