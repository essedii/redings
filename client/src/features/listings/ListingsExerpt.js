const ListingsExcerpt = ({ listing }) => {
  return (
    <div className="card mb-4" style={{ width: "18rem", backgroundColor: 'whitesmoke' }}>
      <div className="card-body">
        <h2 className="card-title">{listing.title}</h2>
        <p className="card-text"> {listing.body.substring(0, 75)}...</p>
        
        <div className="d-flex justify-content-center">
        <a
          href={"http://localhost:3000/listings/" + listing._id}
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
          </div>
      </div>
    </div>
  );
};

export default ListingsExcerpt;
