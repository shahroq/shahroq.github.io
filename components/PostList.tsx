import { Tags } from "@/components";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
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
          <li key={id} className="card">
            <div className="card-body">
              <h2>
                <Link href={postUrl}>{title}</Link>
              </h2>
              <p>{excerpt}</p>
              {published_date && (
                <p className="small">{formatDate(published_date)}</p>
              )}

              {tags && <Tags tags={tags} />}

              <div className="flex justify-end">
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
