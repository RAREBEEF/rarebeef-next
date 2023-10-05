import { PropsWithChildren, useState } from "react";
import Nav from "./Nav";
import Toolbar from "./Toolbar";
import { useRouter } from "next/router";
import PushRequest from "./PushRequest";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {children}
      <Nav setShowModal={setShowModal} />
      <Toolbar />
      <PushRequest setShowModal={setShowModal} showModal={showModal} />
    </>
  );
};

export default Layout;
