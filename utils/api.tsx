import path from "path";
import matter from "gray-matter";
import Post from "@/interfaces/Post";
import Project from "@/interfaces/Project";
import {
  getFilesInFolder,
  readFileContent,
  sortByDate,
  sortByID,
} from "@/utils";

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

  // filter hidden posts
  posts = posts.filter((post) => !post.hidden);

  // sort posts desc by date
  posts.sort(sortByDate);

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
      hidden: !!data.hidden,
      body: data.body ?? "",
    } as Project;
  });

  // filter hidden projects
  projects = projects.filter((project) => !project.hidden);

  // sort projects desc by date
  projects.sort(sortByID);

  return projects;
};
