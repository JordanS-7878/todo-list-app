import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import SearchBar from "../components/SearchBar";
import { useTasks } from "../hooks/useTasks";
import TaskGroup from "../components/TaskGroup";
import { useTaskSearch } from "../hooks/useTaskSearch";
import { useState } from "react";

export default function Completed() {
  const { tasks } = useTasks();
  const [query, setQuery] = useState("");

  const groupOrder = ["completed"];
  const completedTasks = tasks.filter((task) => task.completed);
  const filteredTask = useTaskSearch(completedTasks, query);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-4xl font-bold">Completed</div>
      <SearchBar query={query} setQuery={setQuery} />
      {completedTasks && completedTasks.length ? (
        groupOrder.map((groupKey) => (
          <TaskGroup
            key={groupKey}
            groupKey={groupKey}
            tasks={filteredTask || []}
          />
        ))
      ) : (
        <Empty
          description={
            <span className="text-black">
              No completed tasks yet — finish something and it’ll show up here.
            </span>
          }
        />
      )}
    </div>
  );
}
