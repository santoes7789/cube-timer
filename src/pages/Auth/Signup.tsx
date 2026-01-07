import Divider from "@/components/Divider";
import "./Auth.css";

function Signup() {
  return (
    <div className="popout-container auth-block">
      <form className="auth-container">

        <div>
          <h2>Sign up</h2>
          Create a new account
        </div>

        <Divider />

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="a@example.com" required />
        </div>

        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input id="password" name="password" type="password" required />
        </div>

        <div>
          <div>
            <label htmlFor="repeat-password">Repeat Password</label>
          </div>
          <input id="repeat-password" name="repeat-password" type="password" required />
        </div>

        <button className="signup-button" >Sign up</button>
        <div className="text-center">
          Already have an account?{" "}  
          <div className="link">Login</div>
        </div>
      </form>
    </div>
  )
}

export default Signup;
