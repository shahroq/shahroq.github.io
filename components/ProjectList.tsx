import Project from "@/interfaces/Project";
import LinkItemIcon from "./LinkItemIcon";

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
  return (
    <ul className="space-y-4">
      {projects.map(({ id, categories, title, description, links }) => {
        // const projectUrl = `/projects/${slug}`;

        return (
          <li key={id} className="card bg-base-100 w-full shadow-sm">
            <div className="card-body">
              <div className="card-badges flex gap-2 flex-row-reverse">
                {categories.map((category, i) => {
                  return (
                    <div key={i} className="badge badge-neutral">
                      {category}
                    </div>
                  );
                })}
              </div>

              <h2 className="card-title">{title}</h2>
              <p>{description}</p>
              <div className="card-actions">
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
