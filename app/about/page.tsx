import { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseMdWithMarked } from "@/lib/markdown";
import Container from "../Container";
import { getPage } from "@/lib/data";

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) return notFound();
  const html = parseMdWithMarked(page.body);

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

export const metadata: Metadata = {
  title: "About",
};
