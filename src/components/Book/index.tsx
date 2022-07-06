import Link from "next/link";
import { IBooks } from "../../pages/books";
import styles from "./styles.module.scss";

export default function Book({ booksJs }: IBooks) {
  return (
    <>
      {booksJs.map((book) => {
        return (
          <Link href={`/books/${book.slug}`} key={book.id}>
            <a className={styles.booksContainer}>
              <picture>
                <img src={book.image.url} alt={book.title} title={book.title} />
              </picture>

              <strong>{book.title}</strong>
            </a>
          </Link>
        );
      })}
    </>
  );
}
