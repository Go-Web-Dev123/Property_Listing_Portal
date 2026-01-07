import React from "react";

const DetailPage = ({ property, onBack, onLogout }) => {
    if (!property) {
        return (
            <div className="container text-center py-5">
                <h2 className="fw-bold">Property not found</h2>
                <button className="btn btn-dark mt-3" onClick={onBack}>
                    Back to Search
                </button>
            </div>
        );
    }

    const attr = property.attributes;

    const mainImage =
        attr.images?.[0]?.srcUrl ||
        attr.image?.url;

    return (
        <div className="bg-white min-vh-100">


            <nav className="navbar bg-white border-bottom px-3 mb-3">
                <div className="container">
                    <button className="btn btn-outline-dark me-3" onClick={onBack}>
                        Back to Search
                    </button>
                    <button className="btn btn-outline-danger ms-auto" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container py-2">
                <div className="row">


                    <div className="col-12 col-lg-7">
                        <img
                            src={mainImage}
                            alt="Property Main"
                            className="img-fluid rounded shadow-sm"
                            style={{
                                width: "100%",
                                height: "600px",
                                objectFit: "cover",
                                borderRadius: "12px"
                            }}
                        />


                        <div className="d-flex gap-3 mt-3">
                            <img
                                src={attr.images?.[1]?.srcUrl ||
                                    attr.image?.[0]?.url}
                                className="rounded shadow-sm"
                                style={{ width: "180px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                                alt="thumb1"
                            />
                            <img
                                src={attr.images?.[2]?.srcUrl ||
                                    attr.image?.[0]?.url}
                                className="rounded shadow-sm"
                                style={{ width: "180px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                                alt="thumb2"
                            />
                        </div>
                    </div>


                    <div className="col-12 col-lg-5">
                        <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "16px" }}>

                            <h2 className="fw-bold mb-1">EUR {property.attributes.price}</h2>
                            <p className="text-muted small">{property.attributes.bedroom} | {property.attributes.floorarea_min || 0} sqm</p>

                            <p className="fw-medium">{property.attributes.title}</p>

                            <p className="text-warning small mb-3">Please contact us</p>

                            <button className="btn btn-dark w-100 py-2 text-uppercase fw-medium mb-4" style={{ borderRadius: "12px" }}>
                                Contact Agent
                            </button>

                            <h5 className="fw-bold border-bottom pb-2 mb-3">FACTS & FEATURES</h5>

                            <ul className="list-unstyled small">
                                <li className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Neighbourhood: {property.attributes.address.address1}</span>
                                    <span></span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Price per sqm: {property.attributes.price}</span>
                                    <span></span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Brochure: {property.attributes.publicBrochureUrl ? <a href={property.attributes.publicBrochureUrl} target="_blank" rel="noreferrer">view FloorPlan</a> : "No URL Found"} </span>
                                    <span></span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Floor plan: {property.attributes.floorplan[0]?.srcUrl ? <a href={property.attributes.floorplan[0]?.srcUrl} target="_blank" rel="noreferrer">View FloorPlan</a> : "No URL Found"}</span>
                                    <span></span>
                                </li>
                            </ul>

                            <div className="pt-3 small text-secondary">
                                <p>{property.attributes.description}</p>
                            </div>
                            {property.attributes.algoliaData.negotiator_details.name && (<>
                                <div className="pt-4 mt-4 d-flex gap-3 align-items-center">
                                    <img
                                        src={property.attributes.algoliaData.negotiator_details.profile_img}
                                        alt="Agent"
                                        className="rounded-circle"
                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-0">{property.attributes.algoliaData.negotiator_details.name}</h6>
                                        <p className="text-muted small mb-1">{property.attributes.algoliaData.negotiator_details.job_title}</p>
                                        <a href="tel:" className="small text-decoration-none me-3">{property.attributes.algoliaData.negotiator_details.work_phone}</a>
                                        <a href="mailto:" className="small text-decoration-none">{property.attributes.algoliaData.negotiator_details.email}</a>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DetailPage;
