import { useState } from "react";
import axios from 'axios';

function Login() {
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleError = (err: Error) => {
        console.error(err);
    }

    const handleSubmitLogin = () => {
        console.log(email, pass);
        axios
        .post(`http://localhost:9041/account/login`, {email, password: pass})
        .then((res) => {
            localStorage.setItem("session", res.data.session);
            document.location = "/home";
        })
        .catch(handleError);
    }

    return (
        <div className="sign-in">
            <h1>Sign in to Journal</h1>
            <input 
                type="email" 
                placeholder="Email" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
            /> <br />
            <input 
                type="password" 
                placeholder="Password" 
                required 
                onChange={(e) => setPass(e.target.value)} 
            /> <br />
            <button onClick={handleSubmitLogin}>
                Sign in
            </button>
        </div>
    );
}

export default Login;