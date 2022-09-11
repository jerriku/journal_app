import { useState } from "react";
import axios from 'axios';

function Register() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmitRegister = (e: any) => {
        console.log(e.target);
        console.log(name, email, pass);
        axios
        .post(`http://localhost:9041/account/register`, {name, email, password: pass})
        .then((data) => {
            console.log(data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="sign-up">
            <h1>Sign up</h1>
            <input 
                placeholder="Full Name" 
                required 
                onChange={(e) => setName(e.target.value)} 
            /> <br />
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
            <button onClick={handleSubmitRegister}>
                Sign up
            </button>
        </div>
    );
}

export default Register;