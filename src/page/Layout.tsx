import { FC } from "react";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Container from "../components/Container";

const Layout: FC = ({ children }) => {
  return (
    <Main>
      <Navbar />
      <Container>{children}</Container>
    </Main>
  );
};

export default Layout;
