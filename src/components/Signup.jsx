import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    setErrors({});
    setLoading(true);

    try {
      await signup(form);

      alert("Account Created Successfully");
      navigate("/login");

    } catch (err) {
      const data = err.response?.data;

      if (data && typeof data === "object") {
        setErrors(data);
      } else {
        setErrors({ general: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Signup</h3>

        {/* ✅ FIXED ALERT */}
        {submitted && Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            Please fix the errors below
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            className={`form-control mb-1 ${errors.name ? "is-invalid" : ""}`}
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}

          <input
            className={`form-control mb-1 mt-2 ${errors.email ? "is-invalid" : ""}`}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}

          <input
            className={`form-control mb-1 mt-2 ${errors.mobile ? "is-invalid" : ""}`}
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <small className="text-danger">{errors.mobile}</small>}

          <input
            className={`form-control mb-1 mt-2 ${errors.address ? "is-invalid" : ""}`}
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <small className="text-danger">{errors.address}</small>}

          <input
            type="password"
            className={`form-control mb-1 mt-2 ${errors.password ? "is-invalid" : ""}`}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}

          <input
            type="password"
            className={`form-control mb-1 mt-2 ${errors.confirmPassword ? "is-invalid" : ""}`}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}

          {errors.general && (
            <div className="alert alert-danger mt-3">
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;