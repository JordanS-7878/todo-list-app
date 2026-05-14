import { Button, Input } from "antd";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { showMessage } from "../utils/message";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login({
        email: email,
        password: password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      showMessage.success("Login successful");

      navigate("/");
    } catch (err) {
      console.error("Failed to login", err);
      showMessage.error("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="text-4xl font-bold">Sign in</div>
        <div className="text-gray-400">Please enter your details</div>
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div>Email address</div>
        <Input
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div>Password</div>
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <Button
            className="flex-1"
            type="primary"
            onClick={() => {
              handleLogin();
            }}
          >
            Sign In
          </Button>
        </div>
        <div className="text-center">
          Don't have an account?{" "}
          <Link
            to="/authentication/sign-up"
            className="text-blue-300 underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
