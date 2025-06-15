import path from "path";
import _ from "lodash";
import matter from "gray-matter";
import Post from "@/lib/types/Post";
import Project from "@/lib/types/Project";
import {
  getFilesInFolder,
  parseMarkdownContent,
  readFileContent,
  slugify,
} from "@/lib/utils";
import { SortOptions } from "./types/SortOptions";

export const getPosts = async (
  query: Partial<Post> = { hidden: false },
  sortOptions: SortOptions<Post> = [
    { key: "published_date", direction: "desc" },
    { key: "id", direction: "desc" },
  ]
): Promise<Post[]> => {
  const postDir = path.join("data", "posts");
  const files = getFilesInFolder(postDir, [".md"]);

  // get slug and front matter
  let posts = files.map((filename) => {
    const slug = slugify(filename);
    const fileContent = readFileContent(filename);
    const { data, content } = matter(fileContent);

    return {
      slug,
      id: data.id,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      published_date: new Date(data.published_date),
      tags: data.tags ?? [],
      hidden: !!data.hidden,
      body: content ?? "",
    } as Post;
  });

  // filter, sort
  posts = _.filter(posts, _.matches(query));
  posts = _.orderBy(
    posts,
    sortOptions.map((option) => option.key),
    sortOptions.map((option) => option.direction)
  );

  return posts;
};

export const getProjects = async function (
  query: Partial<Post> = { hidden: false },
  sortOptions: SortOptions<Project> = [
    { key: "priority", direction: "asc" },
    { key: "id", direction: "desc" },
  ]
): Promise<Project[]> {
  const projectDir = path.join("data", "projects");
  const files = getFilesInFolder(projectDir, [".md"]);

  // get slug and front matter
  let projects = files.map((filename) => {
    const slug = slugify(filename);
    const fileContent = readFileContent(filename);

    const { data, content } = matter(fileContent);

    return {
      slug,
      id: data.id,
      tags: data.tags,
      title: data.title ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
      links: data.links ?? [],
      priority: data.priority ?? 1000,
      hidden: !!data.hidden,
      body: content ?? "",
    } as Project;
  });

  projects = _.filter(projects, _.matches(query));
  projects = _.orderBy(
    projects,
    sortOptions.map((option) => option.key),
    sortOptions.map((option) => option.direction)
  );

  return projects;
};

export const getPage = async function <T>(
  filePath: string,
  mapper: (raw: any) => T
): Promise<T> {
  const raw = parseMarkdownContent(filePath);

  return mapper(raw);

  // return {
  //   ...data,
  //   body: content,
  // } as T;
};
