export default function dateTimeFormatter(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  const niceDateAndTime = `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`;

  return niceDateAndTime;
}