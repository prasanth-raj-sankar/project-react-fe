import { useState } from "react";
import { sendResetPasswordEmailAPI } from "../apis"; // Assuming this API exists

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendResetPasswordEmailAPI({ email });
      setMessage(response.msg);  // Success message from the server
    } catch (e) {
      setMessage(e.message);  // Error message
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Forget Password</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
