import React, { ChangeEvent } from "react";
import Input from "@atomics/Input";
import COPY_TEXT from "@util/copyText";

type HeaderProps = {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ setSearchString }: HeaderProps) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };
  return (
    <Input
      fullWidth
      placeholder={COPY_TEXT.PLACEHOLDER.search}
      onChange={onInputChange}
    />
  );
};

export default Header;
