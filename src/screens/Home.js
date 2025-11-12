import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  // Helper variable to check if any items match the search query
  const searchResults = foodItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      {/* Carousel */}
      <div>
        <div 
          id="carouselExampleFade" 
          className="carousel slide carousel-fade" 
          data-bs-ride="carousel"
          data-bs-interval="5000" // Added for 3-second auto-slide
          data-bs-pause="false"    // Added to prevent pausing on hover
        >
          {/* Removed unused id='carousel' from here */}
          <div className="carousel-inner"> 
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              {/* Wrapped in a <form> for better semantics */}
              <form className="d-flex justify-content-center" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </form>
            </div>
            <div className="carousel-item active">
              {/* Added height, objectFit, and better alt tag */}
              <img 
                src="/1313839.jpg" 
                className="d-block w-100" 
                style={{ filter: "brightness(30%)", height: "600px", objectFit: "cover" }} 
                alt="Burger and fries" 
              />
            </div>
            <div className="carousel-item">
              <img 
                src="/794259.jpg" 
                className="d-block w-100" 
                style={{ filter: "brightness(30%)", height: "600px", objectFit: "cover" }} 
                alt="Assorted pastries" 
              />
            </div>
            <div className="carousel-item">
              <img 
                src="/1308370.jpg" 
                className="d-block w-100" 
                style={{ filter: "brightness(30%)", height: "600px", objectFit: "cover" }} 
                alt="Pizza" 
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='container my-4'>
        {/* Loading Spinner */}
        {(foodCat.length === 0 || foodItems.length === 0) && !search ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-success" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          // Map over categories
          foodCat.map((data) => {
            // Get items for this category that match the search
            const categoryItems = foodItems.filter(
              (item) =>
                item.CategoryName === data.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            // Only render the category if there are items to show
            return categoryItems.length > 0 ? (
              <div className='row mb-4' key={data._id}>
                <div className='col-12'>
                  <h2 className='fs-3 fw-bold m-3 ms-0'>{data.CategoryName}</h2>
                  <hr className='border-2 border-success opacity-50' />
                </div>
                {categoryItems.map((filterItems) => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-4'>
                    <Card
                      foodName={filterItems.name}
                      item={filterItems}
                      options={filterItems.options[0]}
                      ImgSrc={filterItems.img}
                    />
                  </div>
                ))}
              </div>
            ) : null; // Don't render category if no items match
          })
        )}

        {/* "No Results" Message */}
        {search.length > 0 && searchResults.length === 0 && (
          <div className='text-center fs-4 fw-bold text-muted mt-5'>
            No items match your search "{search}".
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}