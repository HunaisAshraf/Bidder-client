export type ReactSetState = React.Dispatch<React.SetStateAction<string>>;

export type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  token: string;
  role: string;
  isActive: boolean;
};

export type AuthData = {
  user?: User | null;
};

export type AdminAuthData = {
  admin?: User | null;
};

export type Auction = {
  _id: string;
  itemName: string;
  basePrice: number;
  currentBid: number;
  description: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  completed: boolean;
  isListed: boolean;
  isVerified: string;
  auctioner: User;
  isBlocked: boolean;
};
