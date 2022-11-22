import React, { ChangeEvent , useState, useRef} from "react";
import debounce from 'debounce';
import Input from "@atomics/Input";
import COPY_TEXT from "@util/copyText";
import { STANDARD_DEBOUNCE_TIMEOUT } from "@util/constants";

type HeaderProps = {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ setSearchString }: HeaderProps) => {
  const [localSearchString, setLocalSearchString] = useState('')
  const setSearchStringDelayed = useRef(debounce(setSearchString,STANDARD_DEBOUNCE_TIMEOUT));
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchString(e.target.value);
    setSearchStringDelayed.current(e.target.value)
  };
  return (
    <Input
      fullWidth
      placeholder={COPY_TEXT.PLACEHOLDER.search}
      value={localSearchString}
      onChange={onInputChange}
    />
  );
};

export default Header;
