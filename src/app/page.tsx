import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Next Auction Dynamics
          </h1>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
            Real-Time Auctioning
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8">
            Seize instant excitement: Bid, triumph, and swiftly through our
            real-time auction platform.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/auctions">Start Exploring</Link>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-10 lg:py-20">
          <div className="flex flex-col items-center mb-8 lg:mb-0">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-purple-500">
                1
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Find the right item
              </p>
            </div>
            <p className="text-gray-600 text-center mt-4 text-sm sm:text-base">
              Browse or use our search agent: Surplex has numerous used Car on
              offer
            </p>
          </div>
          <div className="flex flex-col items-center mb-8 lg:mb-0">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-purple-500">
                2
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Place a bid
              </p>
            </div>
            <p className="text-gray-600 text-center mt-4 text-sm sm:text-base">
              Place a direct bid or use our bidding agent to achieve the best
              price for an item.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-purple-500">
                3
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Pay & receive your item
              </p>
            </div>
            <p className="text-gray-600 text-center mt-4 text-sm sm:text-base">
              Winners receive invoices, pick payment options, and coordinate
              pickup with our service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
