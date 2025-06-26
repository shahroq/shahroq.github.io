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
  let collection = rawCollection.map(mapper);

  // filter
  collection = _.filter(collection, _.matches(query));

  // sort
  collection = _.orderBy(
    collection,
    sortOptions.map((option) => option.key),
    sortOptions.map((option) => option.direction)
  );
  return collection;
};
