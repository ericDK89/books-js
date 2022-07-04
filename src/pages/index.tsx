import type { NextPage } from "next";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from "./home.module.scss";

const Home: NextPage = () => {
  return (
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
          Tudo isso por apenas <span> R$ 25,50 por mês</span>
        </p>

        <SubscribeButton />
      </main>

      <article>
        <Image
          src="/open-doodles-reading-side.svg"
          alt="Garota lendo um livro"
          width={500}
          height={500}
        />
      </article>
    </div>
  );
};

export default Home;
