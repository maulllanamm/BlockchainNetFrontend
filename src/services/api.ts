import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;

type TransactionValue = {
  sender: string;
  recipient: string;
  amount: number;
};

const postTransaction = async (data: TransactionValue) => {
  try {
    const response = await axios.post(`${apiUrl}/transactions`, data);
    return response;
  } catch (error) {
    console.log(error);
    alert("Transaction gagal dikirim");
  }
};

export default postTransaction;
