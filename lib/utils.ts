import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface ParsedMarkdown {
  slug: string;
  body: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // allows frontmatter fields of any shape
}

/**
 * Returns a list of files with specified extensions from a folder.
 * @param folderPath - Relative or absolute path to the folder.
 * @param extensions - Optional array of extensions to filter by (e.g., ['.md', '.txt']).
 * @returns Array of file names matching the extension(s).
 */
export const getFilesInFolder = (
  folderPath: string,
  extensions?: string[],
  withFullPath: boolean = true
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

  return withFullPath
    ? files.map((file) => path.join(absolutePath, file))
    : files;
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

/**
 * Parses a markdown (.md) file and extracts its frontmatter and content.
 *
 * @param filePath - The relative or absolute path to the markdown file.
 * @returns An object containing:
 *  - `slug`: The filename without extension, used as a unique identifier.
 *  - `body`: The raw markdown content (excluding frontmatter).
 *  - Additional fields defined in the frontmatter (as key-value pairs).
 */
export const parseMarkdownContent = (filename: string): ParsedMarkdown => {
  const slug = slugify(filename);

  const fileContent = readFileContent(filename);

  const { data, content } = matter(fileContent);

  return {
    slug,
    ...data,
    body: content,
  };
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

/**
 * Converts a file path to a slug by removing the .md extension and path.
 *
 * @param filename - File name or path (e.g., 'posts/my-post.md').
 * @returns Slugified file name without extension (e.g., 'my-post').
 */
export function slugify(filename: string): string {
  return path.basename(filename, ".md");
}
