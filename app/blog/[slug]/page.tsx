import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Container from "@/app/Container";
import Tags from "@/components/Tags";
import { formatDate } from "@/lib/utils";
import { getPost, getPosts } from "@/lib/data";
import { parseMdWithMarked } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) return notFound();
  const html = parseMdWithMarked(post.body);

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
          dangerouslySetInnerHTML={{ __html: html }}
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

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}
