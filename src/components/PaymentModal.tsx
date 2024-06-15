"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal() {
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PaymentElement />
        <Button
          onClick={handlePayment}
          className="bg-[#231656] text-white font-semibold px-3 py-2 rounded-full mt-4 hover:bg-[#201744]"
        >
          Pay Now
        </Button>
      </Box>
    </Modal>
  );
}
