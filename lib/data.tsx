import path from "path";
import _ from "lodash";
import matter from "gray-matter";
import Post from "@/interfaces/Post";
import Project from "@/interfaces/Project";
import { getFilesInFolder, readFileContent, slugify } from "@/lib/utils";

type SortDirection = "asc" | "desc";

type SortOption<T> = {
  key: keyof T;
  direction: SortDirection;
};

type SortOptions<T> = SortOption<T>[];

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

    // get file content
    const fileContent = readFileContent(path.join(postDir, filename));

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

    // get file content
    const fileContent = readFileContent(path.join(projectDir, filename));

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
  file: string,
  subdir: string = ""
): Promise<T> {
  const pagePath = path.join("data", subdir, file);

  const fileContent = readFileContent(pagePath);
  const { data, content } = matter(fileContent);

  return {
    ...data,
    body: content,
  } as T;
};
