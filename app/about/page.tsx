import path from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Page from "@/interfaces/Page";
import matter from "gray-matter";
import { parseMdMarked } from "@/lib/markdown";
import Container from "../Container";
import { readFileContent } from "@/lib/utils";

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
  const fileContent = readFileContent(pagePath);

  const page = matter(fileContent);

  return {
    ...page.data,
    body: page.content,
  } as Page;
}

export const metadata: Metadata = {
  title: "About",
};
