import { useState } from "react";
import axios from "axios";

function EntryForm() {
    const [entry, setEntry] = useState("");
    
    const handleError = (err: Error): void => {
        console.error(err);
    }

    const handleCreateEntry = (): void => {
        const session = localStorage.getItem("session");

        if (!session) {
            alert("no available session");
            return;
        }

        axios
        .post(`http://localhost:9041/journal`, {
            entry
        }, {
            headers: { Authorization: `Bearer ${session}` }
        })
        .then((data) => {
            console.log(data);
            window.location.reload();
        })
        .catch(handleError);
    }

    return (
        <div className="entry-form">
            <textarea
                onChange={(e) => setEntry(e.target.value)}
            ></textarea> <br />
            <button
                onClick={handleCreateEntry}
            >
                Create
            </button>
        </div>
    )
}

export default EntryForm;