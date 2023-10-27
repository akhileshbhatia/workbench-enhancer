// Gets a random timestamp between 1st January 2000 and today
export function getRandomTimestamp(): number {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return Math.round(<number><unknown>randomDate / 1000);
}
