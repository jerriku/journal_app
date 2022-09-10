import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Access() {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return toggle ? (
        <>
        <Login />
        <button onClick={handleToggle}>
            Create an account
        </button>
        </>
    ) : (
        <>
        <Register />
        <button onClick={handleToggle}>
            Back
        </button>
        </>
    )
}

export default Access;