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

  useEffect(() => {
    const getData = async () => {
      try {
        const user = adminAxiosInstance.get("/api/auth/dashboard-user");
        const auctions = adminAxiosInstance.get(
          "/api/auction/dashboard-auction"
        );

        const [userData, auctionsData] = await Promise.all([user, auctions]);

        console.log(userData, auctionsData);

        setUser(userData.data.data);
        setAuctions(auctionsData.data.count);
        for (let revenue of auctionsData.data.data) {
          for (let i = 1; i <= 12; i++) {
            if (revenue.month === i) {
              pData.push(revenue.totalRevenue);
            } else {
              pData.push(0);
            }
          }
        }
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
      <div className="chart-component md:mx-36  gap-4">
        <h1 className="text-slate-700 text-2xl font-semibold mb-5">
          Dashboard
        </h1>
        <div className="md:flex">
          <div className="charts">
            <div className="chart bg-white">
              <div className="p-2">
                <h4 className="font-semibold">Revenue</h4>
              </div>
              <Box
                sx={{
                  height: "300px",
                }}
              >
                <LineChart
                  series={[{ data: pData, label: "Revenue" }]}
                  xAxis={[{ scaleType: "point", data: xLabels }]}
                />
              </Box>
            </div>
            <div className="side-chart md:flex gap-4 my-4">
              <div className="chart bg-white">
                <div className="p-2">
                  <h4 className="font-semibold">Users</h4>
                </div>
                <Box
                  sx={{
                    height: "300px",
                    width: {
                      sm: "350px",
                    },
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: user?.bidder, label: "Bidders" },
                          { id: 1, value: user?.auctioner, label: "auctioner" },
                        ],
                      },
                    ]}
                  />
                </Box>
              </div>
              <div className="chart bg-white">
                <div className="p-2">
                  <h4 className="font-semibold">Auctions</h4>
                </div>
                <Box
                  sx={{
                    height: "300px",
                    width: {
                      sm: "350px",
                    },
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: auctions?.completed,
                            label: "Upcoming",
                          },
                          { id: 1, value: auctions?.live, label: "Live" },
                          {
                            id: 2,
                            value: auctions?.upcoming,
                            label: "Completed",
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </div>
            </div>
          </div>
          <div className="date-time">
            {/* <div className="calender">
              <Box
                sx={{
                  width: {
                    sm: "400px",
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
                </LocalizationProvider>
              </Box>
            </div> */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChartComponent;
