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

export const getAmount = async (address: string) => {
  try {
    const response = await apiClient.get(`/wallets/${address}/balance`);
    return response.data;
  } catch (error) {
    console.error("Error in getAmount:", error);
  }
};

export const getTransactions = async (address: string) => {
  try {
    const response = await apiClient.get(`/wallets/${address}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error in getTransactions:", error);
  }
};

export const getBlocks = async () => {
  try {
    const response = await apiClient.get("/blocks");
    return response.data;
  } catch (error) {
    console.error("Error in getBlocks:", error);
  }
};

export const postMining = async (minerAddress: string) => {
  try {
    const response = await apiClient.post(
      `/blocks/mine?minerAddress=${encodeURIComponent(minerAddress)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in postMining:", error);
  }
};

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
