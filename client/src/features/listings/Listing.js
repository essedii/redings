const Listing = ({ listing }) => {
    return (
        <div>
            <h1>{listing.title}</h1>
            <p>{listing.body}</p>
            <h5>{listing.author}</h5>
        </div>
        <div>
            {listing.tags}
        </div>
        <h1>signup</h1>
    )
}