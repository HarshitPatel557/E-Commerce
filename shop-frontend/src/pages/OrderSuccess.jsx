import { useNavigate, useParams } from "react-router-dom";

const OrderSuccess = ({total}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-teal-100 mt-16 text-center">

      {/* Success Icon */}
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
        <span className="text-white text-5xl">✔</span>
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-emerald-700 mb-3">
        Order Successful!
      </h2>

      {/* Subtitle */}
      <p className="text-teal-700 mb-6 text-lg">
        Thank you for shopping with us — your order is confirmed.
      </p>

      {/* Order ID */}
      <p className="text-teal-900 text-lg mb-8">
        Your order ID is: <strong className="text-emerald-700">{id}</strong>
      </p>

      {/* Estimated Delivery Box */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-8 text-left shadow-md">
        <h3 className="text-xl font-bold text-teal-900 mb-2">📦 Estimated Delivery</h3>
        <p className="text-emerald-700 font-medium">3 – 5 business days</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow mb-10 text-left">
        <h3 className="text-xl font-bold text-teal-900 mb-4">🧾 Order Summary</h3>

        <ul className="space-y-3 text-teal-800">
          <li className="flex justify-between">
            <span>Order Total</span>
            <span className="font-bold">₹{total}</span>
          </li>

          <li className="flex justify-between">
            <span>Delivery</span>
            <span className="font-bold text-emerald-700">FREE</span>
          </li>

          <li className="flex justify-between pt-3 border-t border-teal-200 text-lg font-bold text-emerald-700">
            <span>Grand Total</span>
            <span>₹{total}</span>
          </li>
        </ul>
      </div>

      {/* Next Actions Section */}
      <div className="text-center mb-10">
        <h3 className="text-xl font-bold text-teal-900 mb-2">Next Steps</h3>

        <p className="text-teal-700">Track your order, explore new products, or continue shopping.</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">

        {/* Track Order (Placeholder) */}
        <button
          className="px-6 py-3 rounded-xl border border-emerald-300 bg-white 
                    text-emerald-700 font-semibold shadow-md hover:bg-emerald-50 transition"
        >
          Track Order 🚚
        </button>

        {/* Continue Shopping */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r 
                    from-emerald-500 to-teal-600 shadow-lg hover:scale-[1.03] transition"
        >
          Continue Shopping 🛍
        </button>
      </div>

      {/* Recommended Products Section */}
      <div className="mt-12 text-left">
        <h3 className="text-2xl font-bold text-teal-900 mb-4">Recommended for You</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Placeholder Cards */}
          <div className="p-4 bg-white rounded-xl shadow border border-teal-100">
            <div className="h-24 bg-teal-100 rounded mb-2"></div>
            <p className="text-teal-900 font-medium">Product A</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow border border-teal-100">
            <div className="h-24 bg-teal-100 rounded mb-2"></div>
            <p className="text-teal-900 font-medium">Product B</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow border border-teal-100">
            <div className="h-24 bg-teal-100 rounded mb-2"></div>
            <p className="text-teal-900 font-medium">Product C</p>
          </div>
        </div>
      </div>

    </div>

  );
};

export default OrderSuccess;
