import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import Book from "../../components/Book";
import { client as apolloClient } from "../api/_lib/apollo";
import styles from "./styles.module.scss";

export interface IBooks {
  booksJs: {
    id: string;
    slug: string;
    title: string;
    image: {
      url: string;
    };
  }[];
}

export default function Books({ booksJs }: IBooks) {
  return (
    <>
      <Head>
        <title>Books.Js | Livros</title>
      </Head>

      <main className={styles.booksContainer}>
        <Book booksJs={booksJs} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const GET_BOOKS_QUERY = gql`
    query GetBooks {
      booksJs {
        id
        slug
        title
        image {
          url
        }
      }
    }
  `;

  const res = await apolloClient.query({
    query: GET_BOOKS_QUERY,
  });

  const { booksJs } = res.data;

  return {
    props: {
      booksJs,
    },
  };
};
