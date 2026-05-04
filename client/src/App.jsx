import {
  CheckCircleOutlined,
  ScheduleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import TaskDrawer from "./components/TaskDrawer";
import { DrawerContext } from "./context/DrawerContext";
import { TasksProvider } from "./context/TasksContext";
import { setMessageApi } from "./utils/message";

const menu = [
  { name: "All Tasks", path: "/", icon: <ScheduleOutlined /> },
  { name: "Today", path: "/today", icon: <StarOutlined /> },
  { name: "Completed", path: "/completed", icon: <CheckCircleOutlined /> },
];

export default function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      <TasksProvider>
        {/* Provides `openDrawer` function to entire component */}
        <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
          <div className="flex h-screen">
            {/* Sidebar */}
            <div className=" w-72 p-4 bg-gray-100">
              <div className="mb-6 p-3 hover:bg-gray-300 rounded cursor-pointer">
                <div className="font-semibold">Jordan Seow</div>
                <div className="text-gray-400">seowjordan74@gmail.com</div>
              </div>

              <nav className="space-y-3">
                {menu.map((item) => (
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
      </TasksProvider>
    </>
  );
}
