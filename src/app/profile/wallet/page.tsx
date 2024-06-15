"use client";

import React, { useEffect, useState } from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/constants";
import WalletTableComponent from "@/components/WalletTableComponent";

type WalletType = {
  balance: number;
  amountUsed: number;
  transcation: any[];
};

export default function Wallet() {
  const [amount, setAmount] = useState<number | null>();
  const [error, setError] = useState(false);
  const [wallet, setWallet] = useState<WalletType>();
  const router = useRouter();

  function handleClick() {
    if (!amount || amount < 10) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/profile/wallet/payment/?amount=${amount}`);
  }

  const getWallet = async () => {
    try {
      const { data } = await axiosInstance.get("/api/payments/get-wallet");

      if (data?.success) {
        console.log(data);
        setWallet(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className="flex justify-center gap-3">
      <div>
        <div className="p-5 shadow-sm shadow-gray-400 rounded-md w-[400px]">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Wallet Amount</p>
                <h1 className="text-3xl my-3 font-semibold">
                  $ {wallet ? wallet?.balance : "0"}
                </h1>
              </div>
              <div className="flex gap-2">
                <div className="text-center">
                  <p className="text-gray-600 text-xs">Used Amount</p>
                  <h1 className="text-md my-1 font-semibold text-red-500">
                    $ {wallet ? wallet?.amountUsed : "0"}
                  </h1>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-xs">Usable Amount</p>
                  <h1 className="text-md my-1 font-semibold text-green-800">
                    $ {wallet ? (wallet.balance - wallet?.amountUsed) : "0"}
                  </h1>
                </div>
              </div>
              <div>
                <div className="bg-gray-300 p-2 rounded-full">
                  <PaymentIcon color="primary" sx={{ fontSize: 50 }} />
                </div>
              </div>
            </div>
            <input
              type="number"
              className="outline-none text-gray-600 w-full border px-3 py-2"
              placeholder="$ enter the amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              min={10}
            />
            {error && <p className="text-red-500">Enter a minimum of $10</p>}
            <button
              className="bg-[#231656] text-white font-semibold px-3 py-2 rounded-full mt-4"
              onClick={handleClick}
            >
              Add Amount <ArrowForwardIcon />
            </button>
          </div>
        </div>
      </div>
      {wallet?.transcation && (
        <WalletTableComponent transcation={wallet?.transcation} />
      )}
    </div>
  );
}
