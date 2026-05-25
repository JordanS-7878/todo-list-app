import {
  CheckCircleOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Avatar, Image, message, Tooltip, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { showMessage } from "./utils/message";
import TaskDrawer from "./components/TaskDrawer";
import { AuthContext } from "./context/AuthContext";
import { DrawerContext } from "./context/DrawerContext";
import { getInitials } from "./utils/getInitials";
import { setMessageApi } from "./utils/message";

const { Text } = Typography;

const menu = [
  { name: "All Tasks", path: "/", icon: <ScheduleOutlined /> },
  { name: "Today", path: "/today", icon: <StarOutlined /> },
  { name: "Completed", path: "/completed", icon: <CheckCircleOutlined /> },
];

/* 
  Layer 2: App.jsx
  → layout brain (UI structure, drawers, nav)
*/
export default function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]);

  const fullName = user?.firstName + " " + user?.lastName;

  const handleLogoutUser = async () => {
    try {
      localStorage.removeItem("token");

      showMessage.success("User signed out");

      setTimeout(() => {
        navigate("/authentication/sign-in");
        setUser(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to sign out user", err);
      showMessage.error("User sign out failed");
    }
  };

  return (
    <>
      {contextHolder}
      {/* Provides `openDrawer` function to entire component */}
      <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-72 p-4 flex flex-col justify-between bg-gray-100">
            <div>
              <Link to="/profile">
                <div className="mb-6 p-3 hover:bg-gray-300 rounded cursor-pointer">
                  <div className="flex gap-2">
                    {user?.image ? (
                      <Image
                        className="rounded-full object-cover"
                        width={64}
                        height={64}
                        alt={fullName}
                        src={`http://localhost:5050${user?.image}`}
                        preview={false}
                      />
                    ) : (
                      <Avatar size={64}>
                        {getInitials(user?.firstName, user?.lastName)}
                      </Avatar>
                    )}

                    <div className="flex flex-col justify-center">
                      <div className="font-semibold">{fullName}</div>
                      <Tooltip title={user?.email}>
                        <div className="text-gray-400 max-w-[150px] truncate">
                          {user?.email}
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Link>

              <nav className="space-y-3">
                {menu.map((item) => (
                  /* 
                  `NavLink` for tracking active state
                  - part of nav menu
                  - active styling handling
                */
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `p-3 block rounded ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <div className="flex gap-2 items-center">
                      {item.icon}
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Log Out button */}
            <div
              className={`p-3 block rounded text-red-500 cursor-pointer hover:bg-red-300`}
              onClick={() => {
                handleLogoutUser();
              }}
            >
              <div className="flex gap-2 items-center">
                <LogoutOutlined />
                Log Out
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 flex-1 flex justify-center bg-white overflow-y-auto">
            <div className="w-full max-w-2xl px-6">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Drawer */}
        <TaskDrawer open={isDrawerOpen} onClose={closeDrawer} />
      </DrawerContext.Provider>
    </>
  );
}
