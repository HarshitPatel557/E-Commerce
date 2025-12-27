import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Order Successful 🎉
      </h2>

      <p className="mb-4">
        Your order ID is <strong>{id}</strong>
      </p>

      <p className="text-gray-600">
        Thank you for shopping with us.
      </p>
    </div>
  );
};

export default OrderSuccess;
