import Divider from "@/components/Divider";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import supabase from "@/utils/supabase";
import { type formStates } from "@/types";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", repeatPassword: ""})
  const [state, setState] = useState<formStates>()

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    setState("submitting")
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    })

    setState("loading")
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const valid = (formData.email && formData.password && formData.password === formData.repeatPassword);

  return (

    <div className="popout-container auth-block">
      <form method="post" onSubmit={handleSignup} className="auth-container">

        <div>
          <h2>Sign up</h2>
          Create a new account
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
            placeholder="a@example.com" required />
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
            type="password" required />
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
            type="password" required />
        </div>

        <button type="submit" className="signup-button" disabled={!valid || state === "submitting"} >Sign up</button>
        <div className="text-center">
          Already have an account?{" "}  
          <Link to={"/login"} className="link">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;
