import fs from "fs";
import path from "path";
import Page from "@/interfaces/Page";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { parseMdMarked } from "@/utils/markdown";
import Container from "../Container";

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) return notFound();
  const html = parseMdMarked(page.body);

  return (
    <Container classNames={["my-12", "prose lg:prose-lg"]}>
      <h1>{page.title}</h1>
      <div
        className="page-body"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </Container>
  );
}

async function getPage(slug: string): Promise<Page> {
  const pagePath = path.join("data", slug + ".md");

  const fileContent = fs.readFileSync(pagePath, "utf-8");

  const page = matter(fileContent);

  return {
    ...page.data,
    body: page.content,
  } as Page;
}
