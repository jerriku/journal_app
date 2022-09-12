import { useEffect, useState } from "react";
import axios from 'axios';

function Home() {
    const [entries, setEntries] = useState([]);
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState(0);

    const handleError = (err: Error) => {
        console.error(err);
    }

    useEffect(() => {
        const session = localStorage.getItem("session");

        if (!session) {
            alert("no available session");
            return;
        }

        axios
        .get(`http://localhost:9041/account`, {
            headers: { Authorization: `Bearer ${session}` }
        })
        .then((res) => {
            setId(res.data.id);
        })
        .catch(handleError);
    }, [update]);

    useEffect(() => {
        const session = localStorage.getItem("session");

        if (!session) {
            alert("no available session");
            return;
        }
        axios
        .get(`http://localhost:9041/journal`, {
            headers: { Authorization: `Bearer ${session}` }
        })
        .then((res) => {
            setEntries(res.data);
            console.log(entries);
        })
        .catch(handleError);
    }, [id]);

    return (
        <>
            Hello World! Your user id is: {id}
        </>
    );
}

export default Home;