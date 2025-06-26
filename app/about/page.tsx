import { getPage } from "@/lib/data";
import { parseMdWithMarked } from "@/lib/markdown";
import StaticPage, { mapToStaticPage } from "@/lib/types/StaticPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import Container from "../Container";

export default async function AboutPage() {
  const slug = "about";
  const filePath = path.resolve(path.join("data", slug + ".md"));
  const page = await getPage<StaticPage>(filePath, mapToStaticPage);

  if (!page) return notFound();

  const html = parseMdWithMarked(page.body);

  return (
    <Container classNames={["my-12"]}>
      <h1>{page.title}</h1>
      <div
        className="page-body prose lg:prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </Container>
  );
}

export const metadata: Metadata = {
  title: "About",
};
