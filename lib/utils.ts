export function getAge(): number {
  const birthDate = new Date(1995, 0, 16);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}


export function getDaysSince(date: Date): number {
  const today = new Date();

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const dateMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.floor(
    (todayMidnight.getTime() - dateMidnight.getTime()) / millisecondsPerDay,
  );
}

export function formatDays(days: number): string {
  const years = Math.floor(days / 365);
  const remainingAfterYears = days % 365;

  const months = Math.floor(remainingAfterYears / 30);
  const remainingDays = remainingAfterYears % 30;

  return `${years} year${years === 1 ? "" : "s"}, ` +
         `${months} month${months === 1 ? "" : "s"}, ` +
         `${remainingDays} day${remainingDays === 1 ? "" : "s"}`;
}
