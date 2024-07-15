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
    padding: 40,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    fontFamily: "Helvetica",
    backgroundColor: "#f5f5f5",
    border: "2px solid #000",
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textDecoration: "underline",
    color: "#003366",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    fontStyle: "italic",
    color: "#003366",
  },
  content: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  user: {
    marginBottom: 30,
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  extraContent: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 1.5,
  },
  signatureRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  signature: {
    borderTopWidth: 1,
    width: 200,
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
  },
  signatureText: {
    fontSize: 12,
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
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
          <Text style={styles.title}>Certificate of Appreciation</Text>
          <Text style={styles.subtitle}>Awarded To</Text>
        </View>
        <View style={styles.user}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.name}>
            For Your Outstanding Bid on the Auction
          </Text>
        </View>
        <View>
          <Text style={styles.content}>
            This is to certify that {user?.name} has successfully participated
            in the auction for the item "{auction?.auctionItem?.itemName}". We
            appreciate your enthusiasm and contribution to our auction event.
          </Text>
        </View>
        <View style={styles.extraContent}>
          <Text>
            Auction Date: {moment(auction?.auctionItem?.endDate).format("LL")}
          </Text>
          <Text>Base Price: ${auction?.auctionItem?.basePrice}</Text>
          <Text>Bid Amount: ${auction?.bidAmount}</Text>
        </View>
        <View style={styles.date}>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.signatureRow}>
          <View>
            <Text style={styles.signature}>Signature</Text>
            <Text style={styles.signatureText}>Event Coordinator</Text>
          </View>
          <View>
            <Text style={styles.signature}>Signature</Text>
            <Text style={styles.signatureText}>Auction Manager</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
