export default function TaskCounter({ tasks }) {
  if (tasks.length === 0) return null;

  if (tasks.length === 1) return <div>{tasks.length} task</div>;

  return <div>{tasks.length} tasks</div>;
}
