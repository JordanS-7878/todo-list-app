import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskCounter from "../components/TaskCounter";
import TaskGroup from "../components/TaskGroup";
import { useDrawer } from "../context/DrawerContext";
import { useGroupedTasks } from "../hooks/useGroupedTasks";
import { useTasks } from "../hooks/useTasks";
import { useTaskSearch } from "../hooks/useTaskSearch";
import { formatFullDate, getTodayDayIndex } from "../utils/date";

export default function Today() {
  const { tasks } = useTasks();
  const { openDrawer } = useDrawer();
  const [query, setQuery] = useState("");

  const days = [
    { id: 1, title: "Mon" },
    { id: 2, title: "Tue" },
    { id: 3, title: "Wed" },
    { id: 4, title: "Thu" },
    { id: 5, title: "Fri" },
    { id: 6, title: "Sat" },
    { id: 7, title: "Sun" },
  ];

  const today = getTodayDayIndex();

  const incompletedTasks = tasks.filter((task) => !task.completed);
  const filteredTask = useTaskSearch(incompletedTasks, query);
  const groupedTasks = useGroupedTasks(filteredTask || []);
  const groupOrder = ["noDate", "overdue", "today"];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-4xl font-bold">Today</div>
      <div className="flex justify-between">
        <div className="text-gray-400">{formatFullDate()}</div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      <div className="flex justify-between gap-12">
        {days.map((day) => (
          <div
            key={day.id}
            className={`pb-2 flex-1 flex flex-col items-center gap-2 ${day.id === today && "border-b-3 border-blue-300"}`}
          >
            <div className="text-gray-400">{day.title}</div>
            <div>{day.id}</div>
          </div>
        ))}
      </div>
      <div className="text-right">
        <TaskCounter tasks={filteredTask} />
      </div>
      <Button
        className="w-full self-center"
        type="primary"
        icon={<PlusOutlined />}
        onClick={openDrawer}
      >
        Add task
      </Button>

      {incompletedTasks && incompletedTasks.length ? (
        groupOrder.map((groupKey) => (
          <TaskGroup
            key={groupKey}
            groupKey={groupKey}
            tasks={groupedTasks[groupKey] || []}
          />
        ))
      ) : (
        <Empty
          description={
            <span className="text-black">
              Nothing scheduled for today — you’re all caught up.
            </span>
          }
        />
      )}
    </div>
  );
}
