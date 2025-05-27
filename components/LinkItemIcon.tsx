import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import LinkItem from "@/interfaces/LinkItem";

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

  return (
    <Link
      href={linkItem.url ? linkItem.url : "#"}
      title={linkItem.label}
      key={linkItem.label}
      className={`${linkClassesString}`}
      target="_blank"
    >
      <IconComponent
        className={`hover:text-gray-700 dark:hover:text-gray-200 transition-colors ${iconClassesString}`}
      />
    </Link>
  );
};

export default LinkItemIcon;
