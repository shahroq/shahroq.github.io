type Props = {
  children: React.ReactNode;
  classNames?: string | string[];
  as?: React.ElementType;
};

const Container = ({
  children,
  classNames = [],
  as: Component = "div",
}: Props) => {
  const initialClassNames = ["max-w-3xl", "mx-auto", "px-5", "border-preview"];

  const combinedClassNames = Array.isArray(classNames)
    ? [...initialClassNames, ...classNames].join(" ")
    : [...initialClassNames, classNames].join(" ");

  return <Component className={combinedClassNames}>{children}</Component>;
};

export default Container;
