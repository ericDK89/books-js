import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export function SubscribeButton() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { data } = useSession();
  const { push } = useRouter();

  async function handleSubscribe() {
    if (!data) {
      signIn("github");
      return;
    }

    if (data.activeSubscription) {
      return push("/books");
    }

    try {
      setIsSubscribing(true);
      const res = await api.post("/subscribe");
      const { sessionId } = res.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      alert(error.message);
    }

    setIsSubscribing(false);
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isSubscribing}
      className={styles.Container}
    >
      {!isSubscribing ? "Assine agora" : "Redirecionando..."}
    </button>
  );
}
