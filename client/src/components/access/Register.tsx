import 'dotenv/config';
import { useState } from "react";
import axios from 'axios';

const { PORT } = process.env;

function Register() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmitRegister = () => {
        axios
        .post(`http://localhost:${PORT}/account/register`, {name, email, password: pass})
    }

    return (
        <form className="sign-up">
            <h1>Sign up</h1>
            <input 
                placeholder="Full Name" 
                onChange={(e) => setName(e.target.value)} 
            /> <br />
            <input 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            /> <br />
            <input 
                placeholder="Password" 
                onChange={(e) => setPass(e.target.value)} 
            /> <br />
            <button onClick={handleSubmitRegister}>
                Sign up
            </button>
        </form>
    );
}

export default Register;