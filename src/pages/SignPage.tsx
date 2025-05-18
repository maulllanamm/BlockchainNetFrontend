import { useState } from "react";
import { postSign } from "../services/api";
import { useForm } from "react-hook-form";

type SignValues = {
  sender: string;
  receiver: string;
  amount: number;
  privateKey: string;
};

const SignPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignValues>();
  const [sign, setSign] = useState<string>("");

  const onSubmit = async (data: SignValues) => {
    try {
      const { sender, receiver, amount, privateKey } = data;

      // Kirim data ke API
      const result = await postSign({ sender, receiver, amount }, privateKey);
      setSign(result);
    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  };

  return (
    <div className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg h-min">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Sign Transaction
      </h3>

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
            Private Key*
          </label>
          <input
            id="privateKey"
            {...register("privateKey", { required: "Private key is required" })}
            type="text"
            placeholder="MHcCAQEEIJfH1tnHo9N9LS0Z3..."
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Sign
          </label>
          <input
            value={sign}
            readOnly
            disabled
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white opacity-70 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 p-2 rounded-md text-white font-medium transition-all shadow-md"
        >
          Sign Transaction
        </button>
      </form>
    </div>
  );
};

export default SignPage;
