import { useEffect, useState } from "react";
import axios from 'axios';
import Entry from "./Entry";
import EntryForm from "./EntryForm";

type JOURNAL = {
    id: number,
    entry: string,
    createdAt: string,
    updatedAt: string,
}

function Home() {
    const [journals, setJournals] = useState([]);

    const handleError = (err: Error): void => {
        console.error(err);
    }

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
            setJournals(res.data);
            console.log(journals);
        })
        .catch(handleError);
    }, []);

    return (
        <>
        <EntryForm />
        <div className="entries">
        {journals.map((journal: JOURNAL) => {
            return (
                <Entry 
                    key={journal.id}
                    id={journal.id} 
                    entry={journal.entry} 
                    createdAt={journal.createdAt} 
                    updatedAt={journal.updatedAt} 
                />
            )
        })}
        </div>
        </>
    );
}

export default Home;