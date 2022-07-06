import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { client } from "../../services/fauna";
import { stripe } from "../../services/stripe";

interface User {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
}

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const user = await client.query<User>(
      q.Get(
        q.Match(
          q.Index("user_by_email"),
          q.Casefold(session?.user?.email as string)
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session?.user?.email as string,
        name: session?.user?.name as string,
      });

      await client.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { stripe_customer_id: stripeCustomer.id },
        })
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckout = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      allow_promotion_codes: true,
      mode: "subscription",
      line_items: [
        {
          price: "price_1LHx2nAdd50odpn3OJgPpVcK",
          quantity: 1,
        },
      ],
      success_url: process.env.STRIPE_SUCCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });

    return res.json({ sessionId: stripeCheckout.id });
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }
};

export default Subscribe;
