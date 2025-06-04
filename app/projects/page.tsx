import { Metadata } from "next";
import Container from "../Container";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/utils/api";

export default async function BlogPage() {
  const projects = await getProjects();

  return (
    <Container classNames={["my-12"]}>
      <h1 className="mb-6">Projects</h1>
      <ProjectList projects={projects} />
    </Container>
  );
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects",
};
