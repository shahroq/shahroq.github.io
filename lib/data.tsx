import path from "path";
import _ from "lodash";
import { getFilesInFolder, parseMarkdownContent } from "@/lib/utils";
import { SortOptions } from "./types";

export const getPage = async function <T>(
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: (raw: any) => T
): Promise<T> {
  const raw = parseMarkdownContent(filePath);

  return mapper(raw);

  // return {
  //   ...data,
  //   body: content,
  // } as T;
};

export const getCollection = async function <T>(
  subdir: string = "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: (raw: any) => T,
  query: Partial<T> = {},
  sortOptions: SortOptions<T> = []
): Promise<T[]> {
  const projectDir = path.join("data", subdir);
  const files = getFilesInFolder(projectDir, [".md"], true);

  // parse md files content
  const rawCollection = files.map(parseMarkdownContent);
  const mapped = rawCollection.map(mapper);

  // filter/sort
  const filtered = _.filter(mapped, _.matches(query));
  const sorted = _.orderBy(
    filtered,
    sortOptions.map((option) => option.key),
    sortOptions.map((option) => option.direction)
  );

  return sorted;
};
