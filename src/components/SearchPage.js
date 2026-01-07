import React, { useState, useEffect, useMemo } from "react";

const SearchPage = ({ onViewDetail, onLogout }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        bedrooms: "",
        neighborhood: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
    });


    useEffect(() => {
        fetchProperties();
    }, []);

    async function fetchProperties() {
        try {
            setLoading(true);
            const response = await fetch(
                "https://mira-strapi-dev.q.starberry.com/api/properties/?_limit=50"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch properties");
            }

            const data = await response.json();
            setProperties(data.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching properties:", err);
        } finally {
            setLoading(false);
        }
    };


    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };


    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
            const a = p.attributes;
            if (filters.bedrooms && a.bedroom !== parseInt(filters.bedrooms, 10)) return false;
            if (filters.minPrice && a.price < parseInt(filters.minPrice, 10)) return false;
            if (filters.maxPrice && a.price > parseInt(filters.maxPrice, 10)) return false;
            if (filters.neighborhood && !a.address.address1?.toLowerCase().includes(filters.neighborhood.toLowerCase())) return false;
            return true;
        });
    }, [properties, filters]);



    if (filters.sortBy === "price-asc") {
        filteredProperties.sort((a, b) => a.attributes.price - b.attributes.price);
    }
    if (filters.sortBy === "price-desc") {
        filteredProperties.sort((a, b) => b.attributes.price - a.attributes.price);
    }

    return (
        <div className="min-vh-100 bg-light">


            <header className="bg-white shadow-sm py-4 mb-4">
                <div className="container text-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="w-100">
                            <h1 className="display-6 fw-bold">Property Listing Portal</h1>
                        </div>
                        <button
                            onClick={onLogout}
                            className="btn btn-danger"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>


            <div className="container mb-4">
                <div className="row g-3 align-items-center">

                    <div className="col-12 col-md-3">
                        <select
                            value={filters.bedrooms}
                            onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                            className="form-select"
                        >
                            <option value="">All Bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3 Bedrooms</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-3">
                        <input
                            type="text"
                            placeholder="Search Title"
                            value={filters.neighborhood}
                            onChange={(e) => handleFilterChange("neighborhood", e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="col-6 col-md-2">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="col-6 col-md-2">
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-2">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                            className="form-select"
                        >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="col-12 text-end text-muted">
                        <strong>{filteredProperties.length}</strong> Results Found
                    </div>
                </div>
            </div>


            {loading && (<p>..loading</p>)}
            {error && (<p>..error</p>)}
            {!loading && !error && (<div className="container">
                <div className="row g-4">
                    {filteredProperties.map((property) => {
                        const attr = property.attributes;
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={property.id}>
                                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">
                                    <img
                                        src={attr.images?.[0]?.srcUrl}
                                        alt="property"
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h6 className="fw-bold">{attr.address?.address1 || "Address N/A"}</h6>
                                        <p className="small text-secondary">{attr.title || "Title N/A"}</p>
                                        <p className="fw-semibold">
                                            {attr.price ? `EUR ${Math.trunc(Number(attr.price))}` : "Price Not Defined"}
                                        </p>
                                        <button
                                            className="btn btn-dark w-100 rounded-3"
                                            onClick={() => onViewDetail(property)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>)}



        </div>
    );
};

export default SearchPage;
