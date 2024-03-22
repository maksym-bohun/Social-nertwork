export function formatDate(date) {
  // Ensure date is a Date object
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Define months and days arrays for formatting
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the components of the date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the date string according to the desired format
  const formattedDate = `${months[month]} ${day}, ${year} ${hours}:${minutes}`;

  return formattedDate;
}
