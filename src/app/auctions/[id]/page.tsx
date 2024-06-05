import axios from "axios";
import moment from "moment";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default async function SingleAuction({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auction/get-single-auction/${params.id}`
  );

  let auction;
  if (data?.success) {
    auction = data.auction;
  }
  console.log(auction);

  return (
    <div className="mx-6 md:mx-16 lg:mx-32 min-h-[91vh] mt-2 md:mt-5">
      <div className="flex justify-center ">
        <div className="w-1/2 shadow-md p-3">
          <img src={auction.images[0]} alt={auction.itemName} />
          <div className="flex gap-2 mt-2">
            {auction.images?.map((img: string, i: number) => (
              <img key={i} src={img} alt="" className="h-24" />
            ))}
          </div>
        </div>
        <div className="w-1/2 shadow-md py-3 px-6">
          <div className="text-center">
            <p className="text-[#231656] font-semibold text-xl my-5">
              {moment(auction.endDate).format("lll")}
            </p>
          </div>
          <div className="">
            <h1 className="text-[#231656] text-2xl font-semibold my-5">
              {auction.itemName}
            </h1>
            <p className="text-gray-500">
              {auction.description} Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Itaque optio esse in laboriosam enim eaque
              beatae, sed eius doloremque rerum? Fuga itaque corrupti labore
              culpa unde, tenetur accusamus? Atque, reprehenderit.{" "}
            </p>
            <h1 className="text-2xl font-bold mt-6 text-gray-500">
              Current bid :{" "}
              <span className="text-[#231656]">{auction.basePrice}</span>
            </h1>

            <div className="flex items-center my-5 gap-3">
              <input type="text" className="outline-none shadow-[#231656] shadow-sm px-4 py-2 rounded-full w-[200px] md:w-[400px]" placeholder="place bid" />
              <button className="bg-[#231656] text-white py-2 px-4 rounded-r-full rounded-l-full font-semibold">Bid</button>
            </div>
            <button className="outline-none shadow-[#231656] shadow-sm px-4 py-2 rounded-full mt-4">
              <QuestionAnswerIcon />
              Chat with auctioner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
