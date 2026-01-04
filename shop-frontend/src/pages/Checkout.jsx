import React from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api';

const Checkout = ({total}) => {

  const navigate = useNavigate();

  const placeOrder = async () => {
    const res = await apiFetch("/api/checkout/", {
      method: "POST",
    });

    if (!res || !res.ok) {
      alert("Session expired. Please login again.");
      return;
    }

    const data = await res.json();
    alert("Order placed Successfully!");
    navigate(`/order-success/${data.order_id}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-teal-100 mt-12">

      {/* Header */}
      <h2 className="text-3xl font-bold text-teal-900 mb-4 flex items-center gap-2">
        🧾 Checkout
      </h2>

      <p className="mb-6 text-teal-700">
        This is a demo checkout. No payment is required.
      </p>

      {/* Summary Box */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
        <h3 className="text-xl font-semibold text-teal-900 mb-3">Order Summary</h3>

        {/* Replace with real cart data if needed */}
        <ul className="space-y-2 text-teal-800">
          <li className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">₹{total}</span>
          </li>

          <li className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">FREE</span>
          </li>

          <li className="flex justify-between border-t border-teal-200 pt-3 text-lg font-bold text-emerald-700">
            <span>Total</span>
            <span>₹{total}</span>
          </li>
        </ul>
      </div>

      {/* Place Order Button */}
      <button
        onClick={placeOrder}
        className="w-full py-3 mt-4 rounded-xl text-white font-semibold text-lg
                  bg-linear-to-r from-emerald-500 to-teal-600 
                  shadow-md hover:shadow-lg hover:scale-[1.02] transition"
      >
        Place Order ✔
      </button>

    </div>

  )
}

export default Checkout;
