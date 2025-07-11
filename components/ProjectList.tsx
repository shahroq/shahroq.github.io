import { Tags } from "@/components";
import { Project } from "@/lib/types";
import LinkItemIcon from "./LinkItemIcon";

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
  return (
    <ul className="">
      {projects.map(({ id, tags, title, excerpt, links }) => {
        // const projectUrl = `/projects/${slug}`;

        return (
          <li key={id} className="card">
            <div className="card-body">
              <div className="flex gap-2 flex-row-reverse">
                {tags && <Tags tags={tags} />}
              </div>

              <h2>{title}</h2>
              <p>{excerpt}</p>
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
