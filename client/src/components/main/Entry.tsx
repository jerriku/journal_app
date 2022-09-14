import axios from 'axios';
import { useState } from 'react';

function Entry({ id, entry: text, createdAt, updatedAt }: any) {
    const [edit, setEdit] = useState(false);
    const [entry, setEntry] = useState(text);

    const handleError = (err: Error): void => {
        console.error(err);
    }

    const handleDelete = (e: any): void => {
        const session = localStorage.getItem("session");
        const id: string = e.target.parentElement.id;
        if (!session) {
            alert("no available session");
            return;
        }

        axios
        .delete(`http://localhost:9041/journal`, {
            data: { id },
            headers: { Authorization: `Bearer ${session}` },
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch(handleError);
    }

    const handleSubmitEdit = (e: any): void => {
        const session = localStorage.getItem("session");
        const id: string = e.target.parentElement.id;

        if (!session) {
            alert("no available session");
            return;
        }

        axios
        .put(`http://localhost:9041/journal`, 
            { id, entry }, 
            { headers: { Authorization: `Bearer ${session}` } }
        )
        .then((res) => {
            console.log(res);
            setEdit(false);
        })
        .catch(handleError);
    }

    const viewWindow = () => {
        return (
            <>
            <p>ID: {id}</p>
            <p>{entry}</p>
            <p>Posted at: {createdAt}</p>
            <p>Updated at: {updatedAt}</p>
            <button onClick={() => setEdit(true)}>Edit</button>
            </>
        );
    }

    const editWindow = () => {
        return (
            <>
            <p>ID: {id}</p>
            <textarea 
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            >
            </textarea>
            <p>Posted at: {createdAt}</p>
            <p>Updated at: {updatedAt}</p>
            <button onClick={handleSubmitEdit}>Submit</button>
            </>
        );
    }

    return (
        <div id={id}>
            {edit ? editWindow() : viewWindow()}
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Entry;