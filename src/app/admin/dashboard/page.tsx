"use client";

import AdminLayout from "@/components/Layout/AdminLayout";
import { Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { adminAxiosInstance } from "@/utils/constants";
let pData: any = [];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ChartComponent = () => {
  const [user, setUser] = useState<any>();
  const [auctions, setAuctions] = useState<any>();
  const [revenue, setRevenue] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const user = adminAxiosInstance.get("/api/v1/auth/dashboard-user");
        const auctions = adminAxiosInstance.get(
          "/api/v1/auction/dashboard-auction"
        );

        const [userData, auctionsData] = await Promise.all([user, auctions]);

        setUser(userData.data.data);
        setAuctions(auctionsData.data.count);

        let sum = 0;
        for (let revenue of auctionsData.data.data) {
          for (let i = 1; i <= 12; i++) {
            if (revenue.month === i) {
              pData.push(revenue.totalRevenue);
              sum += Number(revenue.totalRevenue);
            } else {
              pData.push(0);
            }
          }
        }
        setRevenue(sum);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return () => {
      pData = [];
    };
  }, []);

  return (
    <AdminLayout>
      <div className="chart-component mx-4 md:mx-8 lg:mx-36 gap-4">
        <h1 className="text-slate-700 text-2xl font-semibold mb-5 text-center lg:text-left">
          Dashboard
        </h1>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <div className="chart bg-white rounded shadow-md mb-5">
              <div className="p-2">
                <h4 className="font-semibold">Revenue</h4>
              </div>
              <Box
                sx={{
                  height: { xs: "200px", sm: "250px", md: "300px" },
                }}
              >
                <LineChart
                  series={[{ data: pData, label: "Revenue" }]}
                  xAxis={[{ scaleType: "point", data: xLabels }]}
                />
              </Box>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="chart bg-white rounded shadow-md mb-4 lg:mb-0">
                <div className="p-2">
                  <h4 className="font-semibold">Users</h4>
                </div>
                <Box
                  sx={{
                    height: { xs: "200px", sm: "250px", md: "300px" },
                    width: { xs: "100%", sm: "300px" },
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: user?.bidder, label: "Bidders" },
                          { id: 1, value: user?.auctioner, label: "Auctioner" },
                        ],
                      },
                    ]}
                  />
                </Box>
              </div>
              <div className="chart bg-white rounded shadow-md">
                <div className="p-2">
                  <h4 className="font-semibold">Auctions</h4>
                </div>
                <Box
                  sx={{
                    height: { xs: "200px", sm: "250px", md: "300px" },
                    width: { xs: "100%", sm: "300px" },
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: auctions?.completed,
                            label: "Completed",
                          },
                          { id: 1, value: auctions?.live, label: "Live" },
                          {
                            id: 2,
                            value: auctions?.upcoming,
                            label: "Upcoming",
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-wrap gap-4">
            <div className="p-3 shadow-md bg-white mb-4 rounded flex-1 min-w-[200px]">
              <h1 className="font-semibold text-xl text-slate-700">
                Total Auction
              </h1>
              <p className="text-2xl font-semibold text-slate-700 mt-2">
                {auctions?.all}
              </p>
            </div>
            <div className="p-3 shadow-md bg-white mb-4 rounded flex-1 min-w-[200px]">
              <h1 className="font-semibold text-xl text-slate-700">
                Total Revenue
              </h1>
              <p className="text-2xl font-semibold text-slate-700 mt-2">
                ${revenue}
              </p>
            </div>
            <div className="p-3 shadow-md bg-white mb-4 rounded flex-1 min-w-[200px]">
              <h1 className="font-semibold text-xl text-slate-700">
                Total Users
              </h1>
              <p className="text-2xl font-semibold text-slate-700 mt-2">
                {user?.all}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChartComponent;
