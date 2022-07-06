import { signIn, signOut, useSession } from "next-auth/react";
import { GithubLogo, X } from "phosphor-react";
import styles from "./styles.module.scss";

export function SignInButton() {
  const { data } = useSession();

  return data ? (
    <button
      type="button"
      onClick={() => signOut()}
      className={styles.Container}
    >
      <GithubLogo size={22} color="#fba94c" />
      {data.user?.name}
      <X size={22} color="#737380" className={styles.CloseButton} />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn("github")}
      className={styles.Container}
    >
      <GithubLogo size={22} color="#f75a68" />
      Entre com o Github
    </button>
  );
}
