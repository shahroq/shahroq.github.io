import fs from "fs";
import path from "path";

/**
 * Returns a list of files with specified extensions from a folder.
 * @param folderPath - Relative or absolute path to the folder.
 * @param extensions - Optional array of extensions to filter by (e.g., ['.md', '.txt']).
 * @returns Array of file names matching the extension(s).
 */
export const getFilesInFolder = (
  folderPath: string,
  extensions?: string[]
): string[] => {
  const absolutePath = path.resolve(folderPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Folder does not exist: ${absolutePath}`);
  }

  const allEntries = fs.readdirSync(absolutePath);

  const files = allEntries.filter((entry) => {
    const entryPath = path.join(absolutePath, entry);
    const isFile = fs.statSync(entryPath).isFile();

    if (!isFile) return false;

    if (extensions && extensions.length > 0) {
      const ext = path.extname(entry).toLowerCase();
      return extensions.includes(ext);
    }

    return true; // No extension filter provided
  });

  return files;
};

/**
 * Reads the content of a file.
 * @param filePath - Relative or absolute path to the file.
 * @returns The file content as a string.
 */
export const readFileContent = (filePath: string): string => {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File does not exist: ${absolutePath}`);
  }

  const content = fs.readFileSync(absolutePath, "utf-8");
  return content;
};

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
