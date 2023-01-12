import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.main}>
      <img
        src={`${process.env.PUBLIC_URL}/Equals_Banner.png`}
        alt="Equals banner"
      />
    </div>
  );
};
