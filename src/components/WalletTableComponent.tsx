import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "action", headerName: "Action", width: 150 },
  { field: "date", headerName: "Date", width: 200 },
];

let rows = [];

export default function WalletTableComponent({ transcation }: any) {
  const arr = [];

  for (let i = transcation.length - 1; i >= 0; i--) {
    arr.push({
      id: i + 1,
      ...transcation[i],
      date: moment(transcation[i].time).format("lll"),
    });
  }
  rows = arr;
  return (
    <div style={{ height: 350, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
