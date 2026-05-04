import dayjs from "dayjs";

export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getTodayDayIndex() {
  const jsDay = new Date().getDay();
  // JS: Sunday = 0, Monday = 1 ...

  // Convert to your system (Mon = 1 ... Sun = 7)
  return jsDay === 0 ? 7 : jsDay;
}

export function formatTime(dateTime) {
  return dayjs(dateTime).format("h:mm A");
}
