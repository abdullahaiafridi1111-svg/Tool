export interface ClientProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  apkFile: string;
  imageUrl?: string;
  binancePayUrl?: string;
  displayOrder?: number;
  isHidden?: boolean;
  createdAt?: string;
}

export interface ClientUser {
  id?: number | string;
  uid?: string;
  name: string;
  email: string;
  isVerified?: boolean;
  photoURL?: string;
  createdAt?: string;
}

export interface ClientPurchase {
  orderId: number | string;
  productId: number;
  productName: string;
  apiKey: string;
  apkFile: string;
  memoNumber: string;
  totalAmount: number;
  purchaseDate: string;
}

export interface ClientOrderHistory {
  orderId: number | string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: {
    productId: number;
    productName: string;
    price: number;
  }[];
  payment?: {
    transactionId: string;
    amount: number;
    status: string;
  };
}

export interface ProductReview {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedBuyer: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface AdminStats {
  revenue: number;
  totalSales: number;
  activeUsers: number;
  totalDownloads: number;
  salesHistory: {
    day: string;
    revenue: number;
  }[];
}

export interface AdminUser {
  id: number | string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AdminOrder {
  id: number | string;
  userName: string;
  userEmail: string;
  items: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface AdminPayment {
  id: number | string;
  transactionId: string;
  userName: string;
  userEmail: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface AdminDownload {
  id: number | string;
  userName: string;
  userEmail: string;
  productName: string;
  downloadCount: number;
  lastDownloadAt: string;
}

export interface AdminApiKey {
  id: number | string;
  apiKey: string;
  userName: string;
  userEmail: string;
  productName: string;
  status: string;
  createdAt: string;
}
