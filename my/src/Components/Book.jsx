const Book = ({name,price,category}) => {
    return (
      <div className="book">
        {/* Below h2 tag should have title */}
        <img src="data:image/jpeg;base64,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" alt={name}></img>
        {/* the below span tags should have respective text content */}
        <p>
          Name: <span>{name}</span>
        </p>
        <p>
          Price:<span>{price}</span>{" "}
        </p>
        <p>
          Category: <span>{category}</span>
        </p>
       
      </div>
    );
  };
  
  export default Book;
  