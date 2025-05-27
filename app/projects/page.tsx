import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Project from "@/interfaces/Project";
import { sortByID } from "@/utils";
import Container from "../Container";
import ProjectList from "@/components/ProjectList";

export default async function BlogPage() {
  const projects = await getProjects();

  return (
    <Container classNames={["my-12"]}>
      <h1 className="mb-6">Projects</h1>
      <ProjectList projects={projects} />
    </Container>
  );
}

async function getProjects(): Promise<Project[]> {
  // read .md files from /data/projects dir
  const projectDir = path.join("data", "projects");

  const files = fs.readdirSync(projectDir).filter((name) => {
    return (
      fs.statSync(path.join(projectDir, name)).isFile() && name.endsWith(".md")
    );
  });

  // get slug and front matter
  let projects = files.map((filename) => {
    // create slug
    const slug = filename.replace(".md", "");

    // get file content
    const fileContent = fs.readFileSync(
      path.join(projectDir, filename),
      "utf-8"
    );

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
}
