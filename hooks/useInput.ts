import React, { useState } from "react";

const useInput = (init?: string) => {
  const [value, setValue] = useState<string>(init || "");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const { value } = e.target;

    setValue(value);
  };

  return { value, onChange, setValue };
};

export default useInput;
