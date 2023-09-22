import { PropsWithChildren } from "react";
import Nav from "./Nav";
import Toolbar from "./Toolbar";
import { useRouter } from "next/router";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <>
      {children}
      <Nav />
      <Toolbar />
    </>
  );
};

export default Layout;
