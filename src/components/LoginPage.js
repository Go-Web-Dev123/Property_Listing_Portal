import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        if (!email || !password) {
            setFormError("Both fields are required");
            return;
        }

        const success = onLogin({ email, password });
        if (!success) {
            setFormError("Invalid login credentials");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow-sm" style={{ width: "360px", borderRadius: "12px" }}>
                <h4 className="text-center fw-bold mb-3">Login</h4>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    {formError && (
                        <div className="alert alert-danger text-center py-2 small">
                            {formError}
                        </div>
                    )}


                    <button type="submit" className="btn btn-dark w-100 fw-medium">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
