import Image from "next/image";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.Container}>
      <div className={styles.Content}>
        <Image src="/logo.png" alt="BooksJs" width={120} height={40} />

        <nav>
          <a href="#">Início</a>
          <a href="#">Livros</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
