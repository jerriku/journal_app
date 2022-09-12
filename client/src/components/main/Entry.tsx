function Entry({ id, entry, createdAt, updatedAt }: any) {
    return (
        <div id={id}>
        <p>ID: {id}</p>
        <p>{entry}</p>
        <p>Posted at: {createdAt}</p>
        <p>Updated at: {updatedAt}</p>
        </div>
    )
}

export default Entry;