import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Access() {
    const [toggle, setToggle] = useState(true);

    const isEmail = (email: string): boolean => {
        const regex: RegExp = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
        return regex.test(email);
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return toggle ? (
        <>
        <Login isEmail={isEmail} />
        <button onClick={handleToggle}>
            Create an account
        </button>
        </>
    ) : (
        <>
        <Register isEmail={isEmail} />
        <button onClick={handleToggle}>
            Back
        </button>
        </>
    )
}

export default Access;