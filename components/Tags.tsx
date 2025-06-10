type Props = {
  tags: string[];
};

const Tags = ({ tags }: Props) => {
  return (
    <section className="flex gap-2">
      {tags.map((tag, index) => {
        return (
          <span key={index} className="badge badge-outline">
            {tag}
          </span>
        );
      })}
    </section>
  );
};

export default Tags;
