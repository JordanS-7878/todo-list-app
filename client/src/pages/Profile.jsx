import { Button, Divider, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser, deleteCurrentUser } from "../api/users";
import { AuthContext } from "../context/AuthContext";
import { showMessage } from "../utils/message";
import ImageUpload from "../components/ImageUpload";
import AvatarUpload from "../components/AvatarUpload";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [image, setImage] = useState(user?.image);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);

  useEffect(() => {
    if (user) {
      setImage(user.image);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const handleResetForm = async () => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);

      if (image) {
        formData.append("image", image);
      }

      const data = await updateCurrentUser(formData);

      setUser(data.user);
      showMessage.success("User updated");
    } catch (err) {
      console.error(err);
      showMessage.error("User update failed");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteCurrentUser();

      localStorage.removeItem("token");
      setUser(null);

      showMessage.success("User deleted");

      setTimeout(() => {
        navigate("/authentication/sign-up");
      }, 2000);
    } catch (err) {
      console.error("Failed to delete user", err);
      showMessage.error("User deletion failed");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-4xl font-bold">Profile</div>
      <AvatarUpload
        value={image}
        onChange={setImage}
        action="http://localhost:5050/api/users/me"
      />
      <Divider className="!my-0" />
      <div className="flex gap-12">
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
      </div>
      <div className="flex gap-12">
        <div className="flex flex-grow flex-col gap-1">
          <div>Email</div>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {/* <div className="flex flex-grow flex-col gap-1">
          <div>Password</div>
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div> */}
      </div>
      <div className="flex gap-12">
        <Button
          className="flex-1"
          onClick={() => {
            handleResetForm();
          }}
        >
          Discard changes
        </Button>
        <Button
          className="flex-1"
          type="primary"
          onClick={() => {
            handleUpdateUser();
          }}
        >
          Save
        </Button>
      </div>
      <div className="flex">
        <Button
          className="flex-1"
          type="primary"
          danger
          onClick={() => {
            handleDeleteUser();
          }}
        >
          Delete profile
        </Button>
      </div>
    </div>
  );
}
