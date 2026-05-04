import { isPast, isToday, isTomorrow, isThisWeek } from "date-fns";

/*
  --
  Logic thinking:

  1. Data input - what comes in (shape)?
  - tasks (list)
  2. Transformation - what needs to happen to said data?
  - iterate through each task
  - compare their date and time
  - push into their corresponding list in the object
  3. Data output - what should the result look like?
  - Object of lists
  {
    noDate: [],
    overdue: [],
    today: [],
    tomorrow: [],
    thisWeek: [],
    upcoming: [],
  }

  UTIL or HOOK?
  ✅ USE A UTIL when:
  “I give input → I get output”
  Examples:
  - grouping tasks
  - formatting dates
  - sorting lists
  - calculating values

  
  ✅ USE A HOOK when:
  “I need React features”
  Examples:
  - fetching data
  - managing state
  - using context
  - side effects (useEffect)
  - caching (useMemo, useCallback)
  --
*/

/* Utility function to group tasks into different title/category */
export function groupTasks(tasks) {
  // Declare an object to store the output
  const groups = {
    noDate: [],
    overdue: [],
    today: [],
    tomorrow: [],
    thisWeek: [],
    upcoming: [],
  };

  // Data transformation
  // `for...of` or `for loop` to iterate each task and push them into each list in the `groups` object
  for (const task of tasks) {
    const taskDate = task?.dateTime;

    if (!taskDate) {
      groups.noDate.push(task);
      continue;
    }

    if (isPast(taskDate) && !isToday(taskDate)) {
      groups.overdue.push(task);
    } else if (isToday(taskDate)) {
      groups.today.push(task);
    } else if (isTomorrow(taskDate)) {
      groups.tomorrow.push(task);
    } else if (isThisWeek(taskDate, { weekStartsOn: 1 })) {
      groups.thisWeek.push(task);
    } else {
      groups.upcoming.push(task);
    }
  }

  // Return output
  return groups;
}
