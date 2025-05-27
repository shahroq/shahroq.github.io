import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { marked } from "marked";
import Post from "@/interfaces/Post";
import Container from "@/app/Container";
import Tags from "@/components/Tags";
import { formatDate } from "@/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <>
      <section id="page-title">
        <Container
          classNames={[
            "flex flex-col items-center justify-center text-center lg:px-16 py-12 lg:py-24",
          ]}
        >
          <h1 className="mb-2">{post.title}</h1>
          <p>{post.excerpt}</p>
          <Tags tags={post.tags} />
        </Container>
      </section>

      <Container classNames={["my-12", "prose lg:prose-lg"]} tag="article">
        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: marked(post.body) }}
        ></div>

        <div className="post-footer">
          {post.published_date && (
            <small className="block">
              Published at: {formatDate(post.published_date)}
            </small>
          )}
          <Link href="/blog" className="">
            Go Back
          </Link>
        </div>
      </Container>
    </>
  );
}

async function getPost(slug: string): Promise<Post> {
  const postPath = path.join("data", "posts", slug + ".md");

  const fileContent = fs.readFileSync(postPath, "utf-8");

  const post = matter(fileContent);

  return {
    ...post.data,
    body: post.content,
  } as Post;
}

export async function generateStaticParams() {
  const postDir = path.join("data", "posts");

  const files = fs.readdirSync(postDir).filter((name) => {
    return (
      fs.statSync(path.join(postDir, name)).isFile() && name.endsWith(".md")
    );
  });

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    return { slug };
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
