type Props = {
  children: React.ReactNode;
  classNames?: string | string[];
  tag?: React.ElementType;
};

const Container = ({ children, classNames = [], tag: Tag = "div" }: Props) => {
  // const initialClassNames = ["container", "mx-auto", "px-4", "border-preview"];
  const initialClassNames = ["max-w-3xl", "mx-auto", "px-5", "border-preview"];

  const combinedClassNames = Array.isArray(classNames)
    ? [...initialClassNames, ...classNames].join(" ")
    : [...initialClassNames, classNames].join(" ");

  return <Tag className={combinedClassNames}>{children}</Tag>;
};

export default Container;
