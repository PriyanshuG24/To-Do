import { useState } from "react";
import {useLogin} from '../hooks/useLogin'
const Login = () => {
  const {login,loading,error}=useLogin()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email,password)
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login
