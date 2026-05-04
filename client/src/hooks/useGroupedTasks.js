import { useMemo } from "react";
import { groupTasks } from "../utils/groupTasks";
import { sortGroupedTasksDate } from "../utils/sortGroupedTaskDate";

/*
  --
  Logic thinking:

  1. Data input - what comes in (shape)?
  - tasks (list)
  2. Transformation - what needs to happen to said data?
  - memoized
  - group with `groupTasks` function 
  - sort date & time with `sortGroupedTaskDate` function
  3. Data output - what should the result look like?
  - Grouped
  - Sorted date & time
  --
*/

export function useGroupedTasks(tasks) {
  /*
    `useMemo` 
    - only recomputes this value `tasks` if its inputs change
    - use with other functions ONLY (heavy recalculation/recomputational purposes)
    - NOT for fetching
   */
  return useMemo(() => {
    const groupedTasks = groupTasks(tasks); // Recompute `tasks` with `groupTasks` function
    return sortGroupedTasksDate(groupedTasks); // Recompute `groupedTasks` with `sortGroupedTasksDate` function
  }, [tasks]); // `tasks` as dependency (for detecting changes)
}
