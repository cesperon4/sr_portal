export function convertArrestTimeToPST(timeStr: string) {
  // Ensure it's always 4 digits (e.g., '0153' -> '0153')
  const padded = timeStr.padStart(4, "0");

  const hours = parseInt(padded.slice(0, 2), 10);
  const minutes = parseInt(padded.slice(2), 10);

  const date = new Date();
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(0);

  // Convert to PST (UTC-8 or UTC-7 depending on DST)
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
    timeZoneName: "short",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
