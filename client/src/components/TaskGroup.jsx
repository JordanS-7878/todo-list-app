import TaskCounter from "../components/TaskCounter";
import { formatGroupTitle } from "../utils/formatGroupTitle";
import TaskItem from "./TaskItem";

export default function TaskGroup({ groupKey, tasks }) {
  if (!tasks.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          {formatGroupTitle(groupKey)}
        </div>
        <TaskCounter tasks={tasks} />
      </div>

      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
