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

export default function AllTasks() {
  const { tasks } = useTasks();
  const { openDrawer } = useDrawer();
  const [query, setQuery] = useState("");

  const incompletedTasks = tasks?.filter((task) => !task.completed);
  const filteredTask = useTaskSearch(incompletedTasks, query);
  const groupedTasks = useGroupedTasks(filteredTask || []);
  const groupOrder = [
    "noDate",
    "overdue",
    "today",
    "tomorrow",
    "thisWeek",
    "upcoming",
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-4xl font-bold">All Tasks</div>

      <SearchBar query={query} setQuery={setQuery} />

      <div className="text-right">
        <TaskCounter tasks={filteredTask} />
      </div>

      <Button
        className="w-full"
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
              No tasks yet — create your first task to get started.
            </span>
          }
        />
      )}
    </div>
  );
}
