import { ChangeEvent } from "react";
import styles from "./InputText.module.scss";

type InputTextProps = {
  id: string;
  label?: string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputText = (props: InputTextProps) => {
  const { id, label, type, value, onChange } = props;

  return (
    <div className={styles.main}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type || "text"}
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
