type Props = {
  tags: string[];
};

const Tags = ({ tags }: Props) => {
  return (
    <section className="flex gap-2 mt-3">
      {tags.map((tag, index) => {
        return (
          <div key={index} className="badge badge-outline m-r-5">
            {tag}
          </div>
        );
      })}
    </section>
  );
};

export default Tags;
