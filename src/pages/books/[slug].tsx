import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { client } from "../api/_lib/apollo";
import styles from "./slug-styles.module.scss";

interface SlugBookProps {
  bookJs: {
    description: string;
    title: string;
    slug: string;
  };
}

export default function SlugBook({ bookJs }: SlugBookProps) {
  return (
    <>
      <Head>
        <title>{`Books.Js | ${bookJs.title}`}</title>
      </Head>

      <h1 className={styles.slugBookTitle}>&quot;{bookJs.title}&quot;</h1>

      <main className={styles.slugBookContainer}>
        <article>{bookJs.description}</article>
        <article>{bookJs.description}</article>
        <article>{bookJs.description}</article>
        <article>{bookJs.description}</article>
      </main>
    </>
  );
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params as IParams;

  console.log(session);

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  const GET_BOOK_QUERY = gql`
    query GetBook($slug: String) {
      bookJs(where: { slug: $slug }) {
        slug
        description
        title
      }
    }
  `;

  const res = await client.query({
    query: GET_BOOK_QUERY,
    variables: {
      slug,
    },
  });

  const { bookJs } = res.data;

  return {
    props: {
      bookJs,
    },
  };
};
