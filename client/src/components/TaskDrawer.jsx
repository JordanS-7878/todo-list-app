import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Drawer, Input } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDrawer } from "../context/DrawerContext";
import { useTasks } from "../hooks/useTasks";
import { createTask, deleteTask, updateTask } from "../api/tasks";
import { showMessage } from "../utils/message";

export default function TaskDrawer({ open, onClose }) {
  const { activeTask, setActiveTask, fetchTasks } = useTasks();
  const { openDrawer, closeDrawer } = useDrawer();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dateTime, setDateTime] = useState(null);

  const isEditMode = !!activeTask;
  const isReadMode = Boolean(activeTask?.completed);

  const handleAddTask = async () => {
    try {
      const task = await createTask({
        title,
        notes,
        dateTime: dateTime?.toISOString() || null,
      });

      fetchTasks();
      setActiveTask(task);

      showMessage.success("Task created");
    } catch (err) {
      console.error("Failed to create task", err);
      showMessage.error("Task creation failed");
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(activeTask._id, {
        title,
        notes,
        dateTime: dateTime?.toISOString() || null,
      });

      fetchTasks();

      showMessage.success("Task updated");
    } catch (err) {
      console.error("Failed to update task", err);
      showMessage.error("Task update failed");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(activeTask._id);

      fetchTasks();
      resetForm();
      closeDrawer();

      showMessage.success("Task deleted");
    } catch (err) {
      console.error("Failed to delete task", err);
      showMessage.error("Task deletion failed");
    }
  };

  const resetForm = () => {
    setTitle("");
    setNotes("");
    setDateTime(null);
    setActiveTask(null);
  };

  useEffect(() => {
    if (activeTask) {
      setTitle(activeTask.title ?? "");
      setNotes(activeTask.notes ?? "");
      setDateTime(activeTask.dateTime ? dayjs(activeTask.dateTime) : null);
    } else {
      resetForm();
    }
  }, [activeTask]);

  return (
    <Drawer
      title={<div className="ml-2 text-3xl font-bold">Task</div>}
      open={open}
      onClose={() => {
        onClose();
        resetForm();
      }}
      closeIcon={<CloseOutlined className="text-2xl" />}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div>Title </div>
          <Input
            placeholder={!isReadMode ? "Title" : ""}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            disabled={isReadMode}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>Notes </div>
          <Input
            placeholder={!isReadMode ? "Notes" : ""}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            disabled={isReadMode}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>Date </div>
          <DatePicker
            placeholder={!isReadMode ? "Select date" : ""}
            showTime
            value={dateTime}
            onChange={(value) => setDateTime(value || null)}
            disabled={isReadMode}
          />
        </div>
        <div className="flex justify-end gap-4">
          {!isEditMode && !isReadMode && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTask}
              disabled={!title?.trim()} // `.trim()` to prevent adding tasks with only whitespaces
            />
          )}
          {isEditMode && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteTask}
            />
          )}
          {isEditMode && !isReadMode && (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleUpdateTask}
              disabled={!title?.trim()}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
}
