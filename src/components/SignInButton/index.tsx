import { GithubLogo, X } from "phosphor-react";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isLogged = true;

  return isLogged ? (
    <button className={styles.Container}>
      <GithubLogo size={22} color="#fba94c" />
      Eric Macedo
      <X size={22} color="#737380" className={styles.CloseButton} />
    </button>
  ) : (
    <button>
      <GithubLogo size={22} color="#f75a68" />
      nada
    </button>
  );
}
