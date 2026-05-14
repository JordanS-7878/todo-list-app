import { Button, Input } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { showMessage } from "../utils/message";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (cPassword !== password) {
        showMessage.error("Password do not match");
        return;
      }

      const data = await register({
        firstName,
        lastName,
        email,
        password,
      });

      // Stores the token
      localStorage.setItem("token", data.token);
      setUser(data.user);
      showMessage.success("Registration successful");

      navigate("/");
    } catch (err) {
      console.error("Failed to register", err);
      showMessage.error("Registration failed");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="text-4xl font-bold">Sign up</div>
        <div className="text-gray-400">Please provide your details</div>
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div>First name</div>
        <Input
          placeholder="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div>Last name</div>
        <Input
          placeholder="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
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
      <div className="flex flex-grow flex-col gap-1">
        <div>Confirm password</div>
        <Input
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <Button
            className="flex-1"
            type="primary"
            onClick={() => {
              handleRegister();
            }}
          >
            Continue
          </Button>
        </div>
        <div className="text-center">
          Already have an account?{" "}
          <Link
            to="/authentication/sign-in"
            className="text-blue-300 underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
