import { PropsWithChildren } from "react";
import Nav from "./Nav";
import Toolbar from "./Toolbar";



const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Nav />
      <Toolbar />
    </>
  );
};

export default Layout;
