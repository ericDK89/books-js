import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Books.Js | Início</title>
      </Head>

      <div className={styles.Container}>
        <main className={styles.Content}>
          <span>🤗 Olá, seja bem vindo</span>
          <h1>
            Seus{" "}
            <span>
              livros <br /> favoritos
            </span>{" "}
            de <br /> qualquer lugar
          </h1>
          <p>
            Tudo isso por apenas <span> {product.amount} </span> por mês
          </p>

          <SubscribeButton />
        </main>

        <article>
          <Image
            src="/open-doodles-reading-side.svg"
            alt="Garota lendo um livro"
            width={500}
            height={500}
            priority
          />
        </article>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LHx2nAdd50odpn3OJgPpVcK");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format((price.unit_amount as number) / 100),
  };

  return {
    props: {
      product,
    },
  };
}
