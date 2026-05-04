function sortByDateAsc(list) {
  const listCopyAsc = [...list];
  return listCopyAsc.sort((a, b) => a.createdAt - b.createdAt);
}

function sortByDateDesc(list) {
  const listCopyDesc = [...list];
  return listCopyDesc.sort((a, b) => b.createdAt - a.createdAt);
}

export function sortGroupedTasksDate(groupedTasks) {
  return {
    ...groupedTasks,

    // 🔴 Overdue → most recent first (feels more relevant UX-wise)
    overdue: sortByDateDesc(groupedTasks.overdue),

    // 🟢 Everything else → earliest first
    noDate: sortByDateAsc(groupedTasks.noDate),
    today: sortByDateAsc(groupedTasks.today),
    tomorrow: sortByDateAsc(groupedTasks.tomorrow),
    thisWeek: sortByDateAsc(groupedTasks.thisWeek),
    upcoming: sortByDateAsc(groupedTasks.upcoming),
  };
}
