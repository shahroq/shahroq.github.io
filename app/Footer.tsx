import { LinkItemIcon } from "@/components";
import { siteName, siteRepoLink, socials } from "@/data/global";
import Container from "./Container";

function Footer() {
  return (
    <footer>
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t footer-border-color border-preview-">
          <div id="copyright">
            <h3>{siteName}</h3>
            <small className="-bg-green-200">
              Made with Next.js. Contribute to this blog at{" "}
              <a target="_blank" href={siteRepoLink}>
                GitHub
              </a>
              .
            </small>
          </div>
          <p id="social-icons" className="flex flex-row-reverse mb-0">
            {socials.map((linkItem, i) => {
              return (
                <LinkItemIcon
                  key={i}
                  linkItem={linkItem}
                  linkClasses={["ml-2"]}
                  iconClasses={["text-2xl ml-1"]}
                />
              );
            })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
