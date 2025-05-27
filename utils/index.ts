export const sortByDate = <T extends { published_date: Date }>(
  a: T,
  b: T
): number => {
  return b.published_date.getTime() - a.published_date.getTime();
};

export const sortByID = <T extends { id: number }>(a: T, b: T): number => {
  return b.id - a.id;
};

export function formatDate(published_date: string | Date): string {
  if (!published_date) throw new Error("Date not available");

  const date = new Date(published_date);
  if (isNaN(date.getTime())) throw new Error("Invalid date");

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
