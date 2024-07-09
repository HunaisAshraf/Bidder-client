// import React from "react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// type Auction = {
//   _id: string;
//   auctionItem: {
//     itemName: string;
//     basePrice: string;
//     description: string;
//     images: string[];
//   };
//   bidAmount: number;
// };

// const getBase64ImageFromURL = async (url: any) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

// export const generateInvoice = async (auction: Auction) => {
//   console.log(auction);

//   const doc = new jsPDF();

//   // Set title and invoice details
//   doc.setFontSize(18);
//   doc.text("Bidder Invoice", 14, 22);

//   doc.setFontSize(12);
//   doc.text("BILL To:", 14, 30);
//   doc.text("Hunasi", 14, 35);
//   doc.text("9568741230", 14, 40);

//   doc.text(`Invoice No: ${Math.round(Math.random() * 100000 + 1)}`, 14, 50);
//   doc.text(`Invoice Date: ${new Date().toLocaleString()}`, 14, 55);

//   // Define the columns and rows for the table
//   const columns = ["Product", "Image", "Base Price", "Bid Price"];
//   const rows = [
//     [
//       auction.auctionItem.itemName,
//       { content: "Image", styles: { halign: "center" } }, // Placeholder for image
//       auction.auctionItem.basePrice,
//       auction.bidAmount,
//     ],
//   ];

//   const imageUrl = auction.auctionItem.images[0];
//   const imageBase64 = await getBase64ImageFromURL(imageUrl);

//   // Add the table to the PDF
//   doc.autoTable({
//     startY: 70,
//     head: [columns],
//     body: rows,
//     didDrawCell: (data: any) => {
//       if (data.column.index === 1 && data.cell.section === "body") {
//         // Add image to the cell
//         doc.addImage(
//           imageBase64,
//           "JPEG",
//           data.cell.x + 2,
//           data.cell.y + 2,
//           20,
//           20
//         );
//       }
//     },
//   });

//   // Save the PDF
//   doc.save("invoice.pdf");
// };
