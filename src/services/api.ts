import axios from "axios";

// Base URL dari .env
const apiUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;

export type TransactionValue = {
  sender: string;
  recipient: string;
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
    alert("Transaksi gagal dikirim.");
  }
};

export const postKeypair = async () => {
  try {
    const response = await apiClient.post("/wallets/keypair", null);
    return response.data;
  } catch (error) {
    console.error("Error in postKeypair:", error);
    alert("Key pair gagal digenerate.");
  }
};
