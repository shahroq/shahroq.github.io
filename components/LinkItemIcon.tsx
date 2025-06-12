import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import LinkItem from "@/lib/types/LinkItem";

interface Props {
  linkItem: LinkItem;
  linkClasses: string[];
  iconClasses: string[];
}

const LinkItemIcon = ({
  linkItem,
  linkClasses = [],
  iconClasses = [],
}: Props) => {
  const IconComponent = FaIcons[linkItem.icon as keyof typeof FaIcons];
  if (!IconComponent) return null;

  const linkClassesString = linkClasses.join(" ");
  const iconClassesString = iconClasses.join(" ");

  const iconElement = (
    <IconComponent
      className={`transition-colors ${
        linkItem.url ? "hover:text-gray-700 dark:hover:text-gray-200" : ""
      } ${iconClassesString}`}
    />
  );

  return linkItem.url ? (
    <Link
      href={linkItem.url}
      title={linkItem.label}
      key={linkItem.label}
      className={linkClassesString}
      target="_blank"
    >
      {iconElement}
    </Link>
  ) : (
    <span
      title={linkItem.label}
      key={linkItem.label}
      className={`${linkClassesString} cursor-not-allowed text-gray-400`}
      aria-disabled="true"
    >
      {iconElement}
    </span>
  );
};

export default LinkItemIcon;
