import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <strong>
          books<span>.</span>Js
        </strong>

        <nav>
          <ActiveLink href="/" activeClassName={styles.activeLink}>
            <a>Início</a>
          </ActiveLink>
          <ActiveLink href="/books" activeClassName={styles.activeLink}>
            <a>Livros</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
