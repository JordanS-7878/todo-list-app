import { useMemo } from "react";

/*
  --
  Logic thinking:

  1. Data input - what comes in (shape)?
  - search query
  - tasks (list)
  2. Transformation - what needs to happen to said data?
  - memoized
  - filter out list based on query
  3. Data output - what should the result look like?
  - tasks (list)
  --
*/

export function useTaskSearch(
  tasks = [], // if `tasks` empty - use empty array
  query = "", // if `query` empty - use empty string (prevents using null or undefined which crashes app)
) {
  const normalizedQuery = query.toLowerCase().trim();

  return useMemo(() => {
    if (!normalizedQuery) return tasks;

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedQuery),
    );
  }, [tasks, normalizedQuery]);
}
