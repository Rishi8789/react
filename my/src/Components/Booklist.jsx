import { useEffect, useState } from "react";
import Book from "./Book";

const BookList = () => {
const[loading,setLoading]=useState(false);
  const[data,setData]=useState([]);
  const[filtering,setFiltering]=useState("")
  const[search,setSearch]=useState("")
  const[sort,setSort]=useState("")
  const[order,setOrder]=useState("")

  let getapi=(apiUrl)=>{
    console.log(apiUrl)
    if(filtering)
      apiUrl +=`?category=${filtering}`
    
    if(search)
      apiUrl+=`?q=${search}`
    
    if(sort)
      apiUrl +=`?_sort=${sort}`
    
    if(order)
      apiUrl+=`&_order=${order}`
    
      return apiUrl;
  }

  const fetchData=async()=>{
   try{
    let apiUrl=`https://plant2.onrender.com/products`;
    let newapiUrl = getapi(apiUrl)
    setLoading(true);

    const res = await fetch(newapiUrl);
    setLoading(false);
    let jsdata = await res.json();
    setData(jsdata); 
    console.log(jsdata);
   }
   catch(error){
    console.log(error);
   }
  }

useEffect(()=>{
  fetchData();
},[filtering,search,sort,order])

  return (
    <>
      <div className="filter-options">
        <label>
          Category:
          <select className="filter-by-category" value ={filtering}
            onChange={(e)=> setFiltering (e.target.value)} 
          // onClick={(e)=>{e.target.value}}
          >
            <option value="all">All Categories</option>
            <option value="Classic">Classic</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Romance">Romance</option>
            <option value="Coming of age">Coming of Age</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Political satire">Political Satire</option>
            <option value="Mystery">Mystery</option>
            <option value="Epic poem">Epic Poem</option>
          </select>
        </label>

        <label>
          Sort by:
          <select className="sort-by"  
            onChange={(e)=> setSort (e.target.value)}> 
            <option value="">Select an option</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="category">Category</option>
            <option value="publication_date">Publication Date</option>
          </select>
        </label>
        <label>
          Order:
          <select className="order" 
            onChange={(e)=> setOrder (e.target.value)}>
            <option value="">Select an option</option>
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
          </select>
        </label>
        <label>
          Search:
          <input 
            value ={search}
            onChange={(e)=> setSearch (e.target.value)}
          />
        </label>
      </div>

      <div className="book-list">

	{loading && <h1 className="loading-text">Loading...</h1>}
        {/* render your book components here and initially don't change the data of db.json*/}
      {data.map((item)=>{
          return <Book
            key={item.name}
            price={item.price}
            name={item.name}
            
            category ={item.category}
       
          />
        })}
      </div>
    </>
  );
};

export default BookList;
