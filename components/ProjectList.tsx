import Project from "@/interfaces/Project";
import LinkItemIcon from "./LinkItemIcon";

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
  return (
    <ul className="">
      {projects.map(({ id, categories, title, description, links }) => {
        // const projectUrl = `/projects/${slug}`;

        return (
          <li key={id} className="card">
            <div className="card-body">
              <div className="flex gap-2 flex-row-reverse">
                {categories.map((category, i) => {
                  return (
                    <span key={i} className="badge badge-neutral">
                      {category}
                    </span>
                  );
                })}
              </div>

              <h2>{title}</h2>
              <p>{description}</p>
              <div className="flex gap-2">
                {links.map((link, i) => {
                  return (
                    <LinkItemIcon
                      key={i}
                      linkItem={link}
                      linkClasses={["text-xl"]}
                      iconClasses={[]}
                    />
                  );
                })}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectList;
