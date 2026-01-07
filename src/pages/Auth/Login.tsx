import Divider from "@/components/Divider";
import "./Auth.css";
import { Link, Navigate, useNavigate } from "react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import supabase from "@/utils/supabase";
import { type formStates } from "@/types";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: ""})
  const [state, setState] = useState<formStates>()

  const navigate = useNavigate()

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    setState("submitting")
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if(error) {
      console.log(error);
    } else {
      navigate("/")
    }
    setState("loading")
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const valid = (formData.email && formData.password);

  return (

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

        <button type="submit" className="signup-button" disabled={!valid || state === "submitting"} >Login</button>
        <div className="text-center">
          Don't have an account?{" "}  
          <Link to={"/signup"} className="link">Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;
