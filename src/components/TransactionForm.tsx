import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { postTransaction } from "../services/api";

type FormValues = {
  sender: string;
  receiver: string;
  amount: number;
  publicKey: string;
  signature: string;
};

const TransactionForm = ({ loading }) => {
  // Inisialisasi useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Fungsi yang dijalankan saat form berhasil disubmit
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const result = await postTransaction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Sender*
        </label>
        <input
          id="sender"
          {...register("sender", { required: "Sender is required" })}
          type="text"
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Sender address"
        />
        {errors.sender && (
          <p style={{ color: "red" }}>{errors.sender.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          receiver*
        </label>
        <input
          id="receiver"
          {...register("receiver", { required: "Receiver is required" })}
          type="text"
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="receiver address"
        />
        {errors.receiver && (
          <p style={{ color: "red" }}>{errors.receiver.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Amount*
        </label>
        <input
          id="amount"
          {...register("amount", { required: "amount is required" })}
          type="number"
          step="0.01"
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Amount"
        />
        {errors.amount && (
          <p style={{ color: "red" }}>{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Public Key*
        </label>
        <input
          id="publicKey"
          {...register("publicKey", { required: "Public key is required" })}
          type="text"
          placeholder="MFkwEwYHKoZIzj0C..."
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Signature*
        </label>
        <input
          id="signature"
          type="text"
          {...register("signature", { required: "SIgnature is required" })}
          placeholder="PV9z+X4uuiasdyWETYsd...."
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading.addTransaction}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 p-2 rounded-md flex justify-center items-center gap-2 transition-all disabled:opacity-50"
      >
        {loading.addTransaction ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Plus size={18} />
        )}
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
