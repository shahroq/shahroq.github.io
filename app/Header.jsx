import Container from "./Container";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="py-2 border-b header-border-color">
      <Container>
        <Navbar />
      </Container>
    </header>
  );
};

export default Header;
