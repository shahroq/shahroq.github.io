import Container from "@/app/Container";
import { Tags } from "@/components";
import { getCollection, getPage } from "@/lib/data";
import { parseMdWithMarked } from "@/lib/markdown";
import { Post, mapToPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.resolve(path.join("data", "posts", slug + ".md"));
  const post = await getPage<Post>(filePath, mapToPost);

  if (!post) return notFound();

  const html = parseMdWithMarked(post.body);

  return (
    <>
      {/* page title area */}
      <section className="page-title">
        <Container
          classNames={[
            "flex flex-col items-center justify-center text-center lg:px-16 py-12 lg:py-24",
          ]}
        >
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <Tags tags={post.tags} />
        </Container>
      </section>

      <Container classNames={["my-12"]} as="article">
        <div
          className="post-body prose lg:prose-lg dark:prose-invert mb-4"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>

        <div className="post-footer">
          {post.published_date && (
            <p className="small">
              Published at: {formatDate(post.published_date)}
            </p>
          )}
          <Link href="/blog">Go Back</Link>
        </div>
      </Container>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getCollection<Post>("posts", mapToPost, {
    hidden: false,
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.resolve(path.join("data", "posts", slug + ".md"));
  const post = await getPage<Post>(filePath, mapToPost);

  return {
    title: post.title,
    description: post.excerpt,
  };
}
