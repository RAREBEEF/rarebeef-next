import React, { useState } from "react";
import styles from "./CreateGuestBook.module.scss";
import * as FB from "../fb";
import Button from "./Button";
import classNames from "classnames";
import axios from "axios";
import useInput from "../hooks/useInput";

const CreateGuestBook = () => {
  const {
    value: content,
    onChange: onContentChange,
    setValue: setContent,
  } = useInput();
  const { value: name, onChange: onNameChange, setValue: setName } = useInput();
  const { value: pw, onChange: onPwChange, setValue: setPw } = useInput();
  const [uploading, setUploading] = useState<boolean>(false);

  const onUpload = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (content === "" || name === "" || pw === "" || uploading) {
      return;
    }

    setUploading(true);

    const auth = FB.getAuth();

    FB.signInAnonymously(auth)
      .then(async () => {
        const {
          data: { ip },
        } = await axios.get("https://api.ipify.org?format=json");

        await FB.addDoc(FB.collection(FB.db, "GuestBook"), {
          name,
          pw,
          content,
          createdAt: new Date().getTime(),
          ip: ip || "unknown",
          displayIp: ip.replace(/\.[0-9]{1,}\.[0-9]{1,}$/i, "") || "unknown",
        });
      })
      .catch((error) => {
        window.alert(
          `방명록 업로드에 실패하였습니다.\n다음에 다시 시도해 주세요.`
        );
      })
      .finally(() => {
        setContent("");
        setName("");
        setPw("");
        setUploading(false);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles["form"]} onSubmit={onUpload}>
        <div className={styles["top-wrapper"]}>
          <div className={styles["top__input-wrapper"]}>
            <input
              className={styles["input--name"]}
              type="text"
              placeholder="이름 (1~10 글자)"
              value={name}
              onChange={onNameChange}
              autoComplete="username"
              minLength={1}
              maxLength={10}
            />
            <input
              className={styles["input--pw"]}
              type="password"
              placeholder="비밀번호 (6~30 글자)"
              value={pw}
              onChange={onPwChange}
              autoComplete="current-password"
              minLength={6}
              maxLength={30}
            />
          </div>
          <div
            className={classNames(
              styles.counter,
              content.length > 50 && styles.over
            )}
          >
            {content.length} / 50
          </div>
        </div>
        <div className={styles["bottom-wrapper"]}>
          <textarea
            className={styles["input--content"]}
            value={content}
            onChange={onContentChange}
            placeholder="내용 (1~50 글자)"
            minLength={1}
            maxLength={50}
          />
          <Button text="등록" classes={["CreateGuestBook"]} />
        </div>
      </form>
    </div>
  );
};

export default CreateGuestBook;

// return (
//   <div className={styles.container}>
//     <form className={styles["form"]} onSubmit={onUpload}>
//       <div className={styles["top-wrapper"]}>
//         <input
//           className={styles["input--name"]}
//           type="text"
//           placeholder="이름 (1~10 글자)"
//           value={name}
//           onChange={onNameChange}
//           autoComplete="username"
//           minLength={1}
//           maxLength={10}
//         />
//         <input
//           className={styles["input--pw"]}
//           type="password"
//           placeholder="비밀번호 (6~30 글자)"
//           value={pw}
//           onChange={onPwChange}
//           autoComplete="current-password"
//           minLength={6}
//           maxLength={30}
//         />
//         <div
//           className={classNames(
//             styles.counter,
//             content.length > 50 && styles.over
//           )}
//         >
//           {content.length} / 50
//         </div>
//       </div>
//       <div className={styles["bottom-wrapper"]}>
//         <textarea
//           className={styles["input--content"]}
//           value={content}
//           onChange={onTextChange}
//           placeholder="내용 (1~50 글자)"
//           minLength={1}
//           maxLength={50}
//         />
//         <Button text="등록" classes={["CreateGuestBook"]} />
//       </div>
//     </form>
//   </div>
// );
// };

// export default CreateGuestBook;
