import { ChangeEvent } from "react";
import styles from "./InputText.module.scss";

type InputTextProps = {
  id: string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputText = (props: InputTextProps) => {
  const { id, type, value, onChange } = props;

  return (
    <input
      className={styles.main}
      type={type || "text"}
      id={id}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};
