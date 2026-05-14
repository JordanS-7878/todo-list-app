import {
  CheckCircleOutlined,
  ScheduleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { message, Image, Switch, Typography, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import TaskDrawer from "./components/TaskDrawer";
import { DrawerContext } from "./context/DrawerContext";
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
  const { user } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]);

  const fullName = user?.firstName + " " + user?.lastName;

  return (
    <>
      {contextHolder}
      {/* Provides `openDrawer` function to entire component */}
      <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-72 p-4 bg-gray-100">
            <Link to="/profile">
              <div className="mb-6 p-3 hover:bg-gray-300 rounded cursor-pointer">
                <div className="flex gap-2">
                  <Image
                    className="rounded-full object-cover"
                    width={64}
                    height={64}
                    alt={fullName}
                    src={`http://localhost:5050${user?.image}`}
                    preview={false}
                  />
                  <div className="flex flex-col justify-center">
                    <div className="font-semibold">{fullName}</div>
                    <Tooltip title={user.email}>
                      <div className="text-gray-400 max-w-[150px] truncate">
                        {user.email}
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
                      isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
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
