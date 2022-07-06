import Link from "next/link";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.Container}>
      <div className={styles.Content}>
        <strong>
          books<span>.</span>Js
        </strong>

        <nav>
          <Link href="/">
            <a>Início</a>
          </Link>
          <Link href="/books">
            <a>Livros</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
