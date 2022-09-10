import 'dotenv/config';
import { useState } from "react";
import axios from 'axios';

const { PORT } = process.env;

function Login() {
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmitLogin = () => {
        axios
        .post(`http://localhost:${PORT}/account/login`, {email, password: pass})
    }

    return (
        <form className="sign-in">
            <h1>Sign in to Journal</h1>
            <input 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            /> <br />
            <input 
                placeholder="Password" 
                onChange={(e) => setPass(e.target.value)} 
            /> <br />
            <button onClick={handleSubmitLogin}>
                Sign in
            </button>
        </form>
    );
}

export default Login;