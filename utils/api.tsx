import path from "path";
import _ from "lodash";
import matter from "gray-matter";
import Post from "@/interfaces/Post";
import Project from "@/interfaces/Project";
import { getFilesInFolder, readFileContent } from "@/utils";

export const getPosts = async (): Promise<Post[]> => {
  const postDir = path.join("data", "posts");
  const files = getFilesInFolder(postDir, [".md"]);

  // get slug and front matter
  let posts = files.map((filename) => {
    // create slug
    const slug = filename.replace(".md", "");

    // get file content
    const fileContent = readFileContent(path.join(postDir, filename));

    const { data } = matter(fileContent);

    return {
      slug,
      id: data.id,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      published_date: new Date(data.published_date),
      tags: data.tags ?? [],
      hidden: !!data.hidden,
      body: data.body ?? "",
    } as Post;
  });

  // filter, sort
  posts = posts.filter((post) => !post.hidden);
  posts = _.orderBy(posts, ["publishDate", "id"], ["desc", "desc"]);

  return posts;
};

export const getProjects = async function (): Promise<Project[]> {
  const projectDir = path.join("data", "projects");
  const files = getFilesInFolder(projectDir, [".md"]);

  // get slug and front matter
  let projects = files.map((filename) => {
    // create slug
    const slug = filename.replace(".md", "");

    // get file content
    const fileContent = readFileContent(path.join(projectDir, filename));

    const { data } = matter(fileContent);

    return {
      slug,
      id: data.id,
      categories: data.categories,
      title: data.title ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
      links: data.links ?? [],
      priority: data.priority ?? 1000,
      hidden: !!data.hidden,
      body: data.body ?? "",
    } as Project;
  });

  projects = projects.filter((project) => !project.hidden);
  projects = _.orderBy(projects, ["priority", "id"], ["asc", "desc"]);

  return projects;
};

export const getPost = async function (slug: string): Promise<Post> {
  const postPath = path.join("data", "posts", slug + ".md");

  const fileContent = readFileContent(postPath);

  const post = matter(fileContent);

  return {
    ...post.data,
    body: post.content,
  } as Post;
};
