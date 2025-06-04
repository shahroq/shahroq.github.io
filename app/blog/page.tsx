import { Metadata } from "next";
import Container from "../Container";
import PostList from "@/components/PostList";
import { getPosts } from "@/utils/api";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container classNames={["my-12", "min-h-[200px]"]}>
      <h1 className="mb-6">Blog</h1>
      <PostList posts={posts} />
    </Container>
  );
}

export const metadata: Metadata = {
  title: "Posts",
  description: "Blog Posts",
};
