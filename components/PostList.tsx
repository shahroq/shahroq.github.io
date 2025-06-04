import Post from "@/interfaces/Post";
import { formatDate } from "@/lib/utils";
import React from "react";
import Tags from "./Tags";
import Link from "next/link";

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <ul className="space-y-4">
      {posts.map(({ id, title, excerpt, slug, tags, published_date }) => {
        const postUrl = `/blog/${slug}`;

        return (
          <li key={id} className="card bg-base-100 w-full shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                <Link href={postUrl}>{title}</Link>
              </h2>
              <p>{excerpt}</p>
              {published_date && <small>{formatDate(published_date)}</small>}

              {tags && (
                <div className="card-actions justify-start">
                  <Tags tags={tags} />
                </div>
              )}
              <div className="card-actions justify-end">
                <Link href={postUrl} className="btn btn-neutral">
                  Read
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
