import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles["copyright"]}>
        Copyright ⓒ {new Date().getFullYear()} Jiankai Xiao.
      </div>
      <div className={styles["tribute"]}>
        <div>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <div>
          Images created by freepik{" - "}
          <a href="https://www.freepik.com/vectors/background">
            www.freepik.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
