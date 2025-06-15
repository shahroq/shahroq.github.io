import { Metadata } from "next";
import Container from "../Container";
import PostList from "@/components/PostList";
import { getCollection } from "@/lib/data";
import Post, { mapToPost } from "@/lib/types/Post";

export default async function BlogPage() {
  const collection = await getCollection<Post>(
    "posts",
    mapToPost,
    {
      hidden: false,
    },
    [
      { key: "published_date", direction: "desc" },
      { key: "id", direction: "desc" },
    ]
  );

  return (
    <Container classNames={["my-12", "min-h-[200px]"]}>
      <h1 className="mb-6">Blog</h1>
      <PostList posts={collection} />
    </Container>
  );
}

export const metadata: Metadata = {
  title: "Posts",
  description: "Blog Posts",
};
