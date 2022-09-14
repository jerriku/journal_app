import { useState } from "react";
import axios from 'axios';

function Register({ isEmail }: any) {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleError = (err: Error): void => {
        console.error(err);
    }

    const handleValidation = (name: string, pass: string, email: string): boolean => {
        if (!name || !pass || !email) return false;
        return true;
    }

    const handleSubmitRegister = (): void => {
        const valid = handleValidation(name, pass, email);
        if (!valid) {
            alert("inputs invalid");
            return;
        }
        if (!isEmail(email)) {
            alert("invalid email address");
            return;
        }

        axios
        .post(`http://localhost:9041/account/register`, {name, email, password: pass})
        .then(() => {
            alert("account has been registered");
            window.location.reload();
        })
        .catch(handleError);
    }

    const handleKeyPressed = (e: any): void => {
        if (e.key === "Enter") handleSubmitRegister();
    }

    return (
        <div className="sign-up">
            <h1>Sign up</h1>
            <input 
                placeholder="Full Name" 
                required 
                onChange={(e) => setName(e.target.value)} 
                onKeyDown={handleKeyPressed} 
            /> <br />
            <input 
                type="email" 
                placeholder="Email" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyDown={handleKeyPressed} 
            /> <br />
            <input 
                type="password" 
                placeholder="Password" 
                required 
                onChange={(e) => setPass(e.target.value)} 
                onKeyDown={handleKeyPressed} 
            /> <br />
            <input 
                type="submit" 
                value="Sign up" 
                onClick={handleSubmitRegister} 
            />
            {/* <button onClick={handleSubmitRegister}>
                Sign up
            </button> */}
        </div>
    );
}

export default Register;