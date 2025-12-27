import React, { useEffect, useState } from 'react'

const Cart = ({cart, refreshCart, total}) => {

  useEffect(()=>{
      refreshCart();
  },[]);

  const updateQuantity=(item_id,quantity)=>{
    if (quantity > 0) {
      // Normal quantity update
      fetch("http://127.0.0.1:8000/api/cart/update/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id, quantity })
      }).then(refreshCart);

    } else {
      // Remove item from cart
      fetch(`http://127.0.0.1:8000/api/cart/delete/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id })
      }).then(()=>{
        // fetchCart();
        refreshCart();
      });
    }
  };

  
  if (!cart) return <p>Loading...</p>




  return (
    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-8 shadow-xl rounded-3xl border border-teal-100 mt-10">

      {/* Header */}
      <h2 className="text-3xl font-bold text-teal-900 mb-6 flex items-center gap-2">
        🛒 Your Cart
      </h2>

      {/* Empty Cart */}
      {cart.items.length === 0 && (
        <p className="text-teal-700 font-medium text-center py-6">
          Your cart is empty.
        </p>
      )}

      {/* Cart Items */}
      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center py-4 border-b border-teal-100"
        >
          {/* Product Info */}
          <div>
            <p className="font-semibold text-teal-900 text-lg">{item.product.name}</p>
            <p className="text-emerald-700 font-medium">₹{item.product.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-800 
                        rounded-lg hover:bg-teal-200 transition"
            >
              −
            </button>

            <span className="font-semibold text-teal-900">{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-800 
                        rounded-lg hover:bg-teal-200 transition"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Total Price */}
      <div className="mt-6 text-right">
        <p className="text-2xl font-bold text-emerald-700">
          Total: ₹{total}
        </p>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => window.location.href = "/checkout"}
        className="mt-8 w-full py-3 rounded-xl text-white font-semibold text-lg 
                  bg-gradient-to-r from-emerald-500 to-teal-600 
                  shadow-md hover:shadow-lg hover:scale-[1.02] transition"
      >
        Proceed to Checkout
      </button>

    </div>

  )
}

export default Cart;
