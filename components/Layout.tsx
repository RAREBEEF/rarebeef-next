import { useDispatch } from "react-redux";
import Nav from "./Nav";
import Toolbar from "./Toolbar";

interface Props {
  children: React.PropsWithChildren;
}

const Layout: React.FC<Props> = ({ children }) => {



  return (
    <>
      {children}
      <Nav />
      <Toolbar />
    </>
  );
};

export default Layout;
