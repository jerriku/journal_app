import { useState } from "react";
import axios from 'axios';

function Login({ isEmail }: any) {
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleError = (err: Error): void => {
        console.error(err);
    }

    const handleValidation = (pass: string, email: string): boolean => {
        if (!pass || !email) return false;
        return true;
    }

    const handleSubmitLogin = (): void => {
        const valid = handleValidation(pass, email);
        if (!valid) {
            alert("inputs invalid");
            return;
        }
        if (!isEmail(email)) {
            alert("invalid email address");
            return;
        }

        axios
        .post(`http://localhost:9041/account/login`, {email, password: pass})
        .then((res) => {
            localStorage.setItem("session", res.data.session);
            document.location = "/home";
        })
        .catch(handleError);
    }

    return (
        <form className="sign-in">
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
            <input 
                type="button" 
                value="Sign in" 
                onClick={handleSubmitLogin} 
            />
            {/* <button onClick={handleSubmitLogin}>
                Sign in
            </button> */}
        </form>
    );
}

export default Login;