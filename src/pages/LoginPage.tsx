import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as authLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authLogin(email, password);

      login(response?.token);

      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section */}
        <div className="flex items-center justify-center bg-[#f5f5f5] px-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Welcome back
            </h1>

            <p className="text-sm text-gray-500 mb-8">
              Please enter your details to sign in
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-11 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full h-11 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button type="button" className="text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className={`w-full h-11 rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-medium  transition`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center justify-center bg-blue-600 p-16">
          <div className="max-w-md text-white">
            <h2 className="text-5xl font-bold mb-6">ticktock</h2>

            <p className="text-base leading-7 text-blue-100">
              Introducing ticktock, our cutting-edge timesheet web application
              designed to help teams manage work hours, productivity, and
              attendance seamlessly from anywhere.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
