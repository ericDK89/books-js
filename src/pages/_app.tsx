import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} basePath="https://books-js.vercel.app/">
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
