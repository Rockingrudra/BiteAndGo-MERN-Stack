import React from 'react'

export default function Carousel() {
    const imageStyle = {
        width: '100%',
        height: '600px',
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'brightness(30%)'
    }

    return (
        <div 
            id="carouselExampleFade" 
            className="carousel slide carousel-fade" 
            data-bs-ride="carousel"
            data-bs-interval="3000" // Added: Sets slide change to 3 seconds
            data-bs-pause="false"     // Added: Prevents pausing on hover
        >
            <div className="carousel-inner" style={{ height: '600px' }}>
              
                <div className="carousel-caption d-none d-md-block" style={{ zIndex: 10 }}>
                    <form className="d-flex" onSubmit={e => e.preventDefault()}>
                        <input
                            className="form-control bg-dark text-white me-2"
                            type="search"
                            placeholder="Search food..."
                            aria-label="Search"
                        />
                        <button className="btn btn-success text-white" type="submit">
                            Search
                        </button>
                    </form>
                </div>

                <div className="carousel-item active">
                    <img src="/1313839.jpg" className="d-block w-100" style={imageStyle} alt="Burger" />
                </div>
                <div className="carousel-item">
                    <img src="/794259.jpg" className="d-block w-100" style={imageStyle} alt="Pastry" />
                </div>
                <div className="carousel-item">
                    <img src="/1308370.jpg" className="d-block w-100" style={imageStyle} alt="Pasta" />
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
    )
}