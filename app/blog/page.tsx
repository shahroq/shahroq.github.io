import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "@/interfaces/Post";
import { sortByDate } from "@/utils";
import Container from "../Container";
import PostList from "@/components/PostList";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container classNames={["my-12", "min-h-[200px]"]}>
      <h1 className="mb-6">Blog</h1>
      <PostList posts={posts} />
    </Container>
  );
}

async function getPosts(): Promise<Post[]> {
  // read .md files from /data/posts dir
  const postDir = path.join("data", "posts");

  const files = fs.readdirSync(postDir).filter((name) => {
    return (
      fs.statSync(path.join(postDir, name)).isFile() && name.endsWith(".md")
    );
  });

  // get slug and front matter
  let posts = files.map((filename) => {
    // create slug
    const slug = filename.replace(".md", "");

    // get file content
    const fileContent = fs.readFileSync(path.join(postDir, filename), "utf-8");

    const { data } = matter(fileContent);

    return {
      slug,
      id: data.id,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      published_date: new Date(data.published_date),
      tags: data.tags ?? [],
      hidden: !!data.hidden,
      body: data.body ?? "",
    } as Post;
  });

  // filter hidden posts
  posts = posts.filter((post) => !post.hidden);

  // sort posts desc by date
  posts.sort(sortByDate);

  return posts;
}
