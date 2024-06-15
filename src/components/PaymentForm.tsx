"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      setIsLoading(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment-processing`,
        },
      });
      if (result.error) {
        if (
          result.error.type === "card_error" ||
          result.error.type === "validation_error"
        ) {
          setMessage(result.error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
        toast.error("Payment Failed");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (!stripe) {
  //       return;
  //     }

  //     const clientSecret = new URLSearchParams(window.location.search).get(
  //       "payment_intent_client_secret"
  //     );

  //     if (!clientSecret) {
  //       return;
  //     }

  //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //       switch (paymentIntent?.status) {
  //         case "succeeded":
  //           setMessage("Payment succeeded!");
  //           break;
  //         case "processing":
  //           setMessage("Your payment is processing.");
  //           break;
  //         case "requires_payment_method":
  //           setMessage("Your payment was not successful, please try again.");
  //           break;
  //         default:
  //           setMessage("Something went wrong.");
  //           break;
  //       }
  //     });
  //   }, [stripe]);
  return (
    <form onSubmit={handleSubmit} className="md:mx-96">
      <Toaster />
      <PaymentElement />
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          disabled={isLoading || !stripe || !elements}
          className="bg-[#002A2C] text-white font-semibold px-3 py-2 rounded-md mt-4 w-full"
        >
          Add
        </button>
      )}

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
