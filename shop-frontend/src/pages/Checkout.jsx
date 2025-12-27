import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {

  const navigate = useNavigate();

  const placeOrder=()=>{
    fetch("http://127.0.0.1:8000/api/checkout/",{
        method:"POST",
    }).then(res=>res.json())
      .then(data=>{
        alert("Order placed Successfully!");
        navigate(`/order-success/${data.order_id}`);
      });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <p className="mb-6 text-gray-600">
        This is a demo checkout. No payment is required.
      </p>

      <button
        onClick={placeOrder}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  )
}

export default Checkout;
