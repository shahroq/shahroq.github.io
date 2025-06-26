import { ProjectList } from "@/components";
import { getCollection } from "@/lib/data";
import Project, { mapToProject } from "@/lib/types/Project";
import { Metadata } from "next";
import Container from "../Container";

export default async function BlogPage() {
  const collection = await getCollection<Project>(
    "projects",
    mapToProject,
    {
      hidden: false,
    },
    [
      { key: "priority", direction: "asc" },
      { key: "id", direction: "desc" },
    ]
  );

  return (
    <Container classNames={["my-12"]}>
      <h1>Projects</h1>
      <ProjectList projects={collection} />
    </Container>
  );
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects",
};
