import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useAppSelector } from "@/lib/store/hooks";
import { User } from "@/utils/types";
import moment from "moment";

type Auctions = {
  _id: string;
  auctionItem: {
    itemName: string;
    basePrice: string;
    description: string;
    images: string[];
    endDate: Date;
  };
  bidAmount: number;
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bill: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  product: {
    marginTop: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
    wordWrap: "break-word",
  },
  image: {
    width: 50,
    height: 50,
    margin: "auto",
  },
});

const InvoiceDocument = ({
  auction,
  user,
}: {
  auction: Auctions;
  user: User;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View>
          <Text style={styles.title}>Bidder</Text>
        </View>
        <View style={styles.user}>
          <View>
            <Text style={styles.bill}>BILL To:</Text>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.name}>{user?.phone}</Text>
            <Text style={styles.name}>{user?.email}</Text>
          </View>
          <View>
            <Text style={styles.name}>
              Invoice No: {Math.round(Math.random() * 100000 + 1)}
            </Text>
            <Text style={styles.name}>
              Invoice Date: {new Date().toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.product}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Product</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Auction Date</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Base Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Bid Price</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {auction?.auctionItem?.itemName}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {moment(auction?.auctionItem?.endDate).format("lll")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {auction?.auctionItem?.basePrice}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{auction?.bidAmount}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
