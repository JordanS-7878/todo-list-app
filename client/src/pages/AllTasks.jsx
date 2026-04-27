import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";

export default function AllTasks() {
  return (
    <div>
      <div className="mb-4 text-3xl font-semibold">All Tasks</div>
      <Button type="primary" icon={<PlusOutlined />}>
        Add task
      </Button>
      <Empty description={"No task - Create one to get started."} />
    </div>
  );
}
