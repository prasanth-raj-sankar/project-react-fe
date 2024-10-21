import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // To capture the token from the URL
import { resetPasswordAPI } from "../apis"; // Assuming this API exists

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams(); // To get query params
  const navigate = useNavigate();

  const token = searchParams.get("token"); // Get the token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await resetPasswordAPI({ token, password });
      setMessage(response.msg);  // Success message from the server
      navigate("/login");  // Redirect to login after successful reset
    } catch (e) {
      setMessage(e.message);  // Error message
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
