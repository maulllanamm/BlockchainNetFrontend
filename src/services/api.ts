import axios from "axios";

// Base URL dari .env
const apiUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;

export type TransactionValue = {
  sender: string;
  receiver: string;
  amount: number;
  publicKey: string;
  signature: string;
};

export type SignValues = {
  sender: string;
  receiver: string;
  amount: number;
};

// Buat instance axios (opsional tapi berguna untuk config global)
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postTransaction = async (data: TransactionValue) => {
  try {
    const response = await apiClient.post("/transactions", data);
    return response.data;
  } catch (error) {
    console.error("Error in postTransaction:", error);
  }
};

export const postKeypair = async () => {
  try {
    const response = await apiClient.post("/wallets/keypair", null);
    return response.data;
  } catch (error) {
    console.error("Error in postKeypair:", error);
  }
};

export const postSign = async (data: SignValues, privateKey: string) => {
  try {
    const response = await apiClient.post("/wallets/sign", data, {
      headers: {
        "x-private-key": privateKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in postSign:", error);
  }
};
