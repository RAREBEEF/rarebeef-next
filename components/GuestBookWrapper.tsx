import CreateGuestBook from "./CreateGuestBook";
import GuestBook from "./GuestBook";
import styles from "./GuestBookWrapper.module.scss";
import { getGusetBookStateType, ReduxStateType } from "../types";
import { useSelector } from "react-redux";

const GuestBookWrapper = () => {
  const { data: guestBook } = useSelector(
    (state: ReduxStateType): getGusetBookStateType => state.getGuestBook
  );

  return (
    <div className={styles.container}>
      <CreateGuestBook />
      <ul className={styles["list"]}>
        {guestBook &&
          guestBook.map((data) => <GuestBook data={data} key={data.id} />)}
      </ul>
    </div>
  );
};

export default GuestBookWrapper;
