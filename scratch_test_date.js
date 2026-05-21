function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateStr) {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function getWeekdayName(dateStr) {
  const date = parseLocalDate(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

console.log("Current System Date/Time:", new Date().toString());
const localDateStr = getLocalDateString();
console.log("getLocalDateString() output:", localDateStr);
const parsedDate = parseLocalDate(localDateStr);
console.log("parseLocalDate() output:", parsedDate.toString());
const weekdayName = getWeekdayName(localDateStr);
console.log("getWeekdayName() output:", weekdayName);

// Let's test with the user's local time: 2026-05-22T01:34:30+05:30
const testDate = new Date("2026-05-22T01:34:30+05:30");
console.log("\nTesting with user local time:", testDate.toString());
const userLocalDateStr = getLocalDateString(testDate);
console.log("userLocalDateStr (should be 2026-05-22):", userLocalDateStr); 
console.log("userWeekday (should be Fri):", getWeekdayName(userLocalDateStr)); 
