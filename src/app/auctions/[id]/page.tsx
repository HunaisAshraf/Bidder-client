"use client";

import moment from "moment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { axiosInstance } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useSocket } from "@/utils/hooks/useSocket";
import BidderListComponent from "@/components/BidderListComponent";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";

type Auction = {
  itemName: string;
  description: string;
  basePrice: number;
  currentBid: number;
  startDate: Date;
  endDate: Date;
  auctioner: string;
  images: string[];
  completed: boolean;
};

export default function SingleAuction({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { socket } = useSocket();
  const auctionId = params.id;
  const [auction, setAuction] = useState<Auction>();
  const [bidAmount, setBidAmount] = useState<number>();
  const router = useRouter();
  const user = useAppSelector((state) => state.users.user);

  const handleBid = async () => {
    try {
      const { data } = await axiosInstance.post("/api/auction/place-bid", {
        bidAmount,
        auctionId,
      });

      console.log(data);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.error === "user not authorised") {
        router.push("/login");
      } else if (
        error?.response?.data?.error === "No sufficient balance in wallet"
      ) {
        toast.error(error?.response?.data?.error);
        router.push("/profile/wallet");
      } else {
        toast.error(error?.response?.data?.error);
      }
    }
  };

  useEffect(() => {
    socket?.on("updatedAuction", (auction) => {
      setAuction((prev) => auction);
    });
  }, [socket,auctionId,auction]);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auction/get-single-auction/${auctionId}`
        );

        if (data?.success) {
          if (data.auction) {
            setAuction(data.auction);
          }
        }
        console.log(auction);
      } catch (error: any) {
        console.log(error);
      }
    };
    getAuction();
  }, []);

  if (!auction) {
    return <Loading />;
  }

  return (
    <div>
      <Toaster />
      <div className="mx-6 md:mx-16 lg:mx-32 min-h-[91vh] mt-2 md:mt-5">
        <div className="md:flex justify-center ">
          <div className="md:w-1/2 shadow-md p-3">
            <Image
              src={auction.images[0]}
              alt={auction.itemName}
              width={500}
              height={400}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {auction.images?.map((img: string, i: number) => (
                <Image key={i} src={img} alt="" height={100} width={150} />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 shadow-md py-3 px-6">
            <div className="text-center">
              {new Date(auction.startDate) < new Date() ? (
                <>
                  <p className="text-[#231656] font-semibold text-2xl my-5">
                    Ends {moment(auction.endDate).endOf("day").fromNow()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    End Date: {moment(auction.endDate).format("lll")}
                  </p>
                </>
              ) : (
                <p className="text-[#231656] font-semibold text-xl my-5">
                  Start Date : {moment(auction.startDate).format("lll")}
                </p>
              )}
            </div>
            <div className="">
              <h1 className="text-[#231656] text-2xl font-semibold my-5">
                {auction.itemName}
              </h1>
              <p className="text-gray-500">
                {auction.description} Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Itaque optio esse in laboriosam enim eaque
                beatae, sed eius doloremque rerum? Fuga itaque corrupti labore
                culpa unde, tenetur accusamus? Atque, reprehenderit.
              </p>
              <div className="md:flex justify-between items-center my-4">
                <h1 className="text-2xl font-bold mt-6 text-gray-500">
                  Base Price :{" "}
                  <span className="text-[#231656]">$ {auction.basePrice}</span>
                </h1>
                {new Date(auction.startDate) < new Date() && (
                  <h1 className="text-2xl font-bold mt-6 text-gray-500">
                    Current bid :{" "}
                    <span className="text-[#231656]">
                      $ {auction.currentBid}
                    </span>
                  </h1>
                )}
              </div>

              {new Date(auction.startDate) < new Date() &&
                user?.id !== auction?.auctioner && (
                  <div className="flex items-center my-5 gap-3">
                    <input
                      type="number"
                      className="outline-none shadow-[#231656] shadow-sm px-4 py-2 rounded-full w-[200px] md:w-[400px]"
                      placeholder="place bid"
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                    />

                    <button
                      onClick={handleBid}
                      className="bg-[#231656] text-white py-2 px-4 rounded-r-full rounded-l-full font-semibold"
                    >
                      Bid
                    </button>
                  </div>
                )}
              <button className="outline-none shadow-[#231656] shadow-sm px-4 py-2 rounded-full mt-4">
                <QuestionAnswerIcon />
                Chat with auctioner
              </button>
            </div>
          </div>
        </div>
        {new Date(auction.startDate) < new Date() && (
          <BidderListComponent auctionId={auctionId} />
        )}
      </div>
    </div>
  );
}
