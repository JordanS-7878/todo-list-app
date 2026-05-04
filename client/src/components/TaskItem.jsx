import { ClockCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useDrawer } from "../context/DrawerContext";
import { useTasks } from "../hooks/useTasks";
import { updateTaskService } from "../services/taskService";
import { formatTime } from "../utils/date";
import { showMessage } from "../utils/message";

export default function TaskItem({ task }) {
  const { activeTask, setActiveTask, fetchTasks } = useTasks();
  const { openDrawer } = useDrawer();

  const handleUpdateTask = async () => {
    try {
      await updateTaskService(task._id, {
        completed: !task.completed,
      });

      fetchTasks();

      showMessage.success("Task updated");
    } catch (err) {
      console.error("Failed to update task", err);
      showMessage.error("Task update failed");
    }
  };

  return (
    <div
      className={`flex items-center justify-between border border-solid rounded p-4 hover:border-blue-300 cursor-pointer ${activeTask && activeTask._id === task._id ? "border-blue-300" : "border-gray-200"}`}
      onClick={() => {
        openDrawer();
        setActiveTask(task);
      }}
    >
      <div className="flex">
        <Checkbox
          checked={task.completed}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            handleUpdateTask();
          }}
          disabled={!!task.completed}
        />
        <div
          className={`ml-3 ${!!task.completed && "text-gray-400 line-through"}`}
        >
          {task.title}
        </div>
      </div>
      {task.dateTime && (
        <div className="text-gray-400">
          {formatTime(task.dateTime)} <ClockCircleOutlined />
        </div>
      )}
    </div>
  );
}
