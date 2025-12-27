import React, { useEffect, useState } from 'react'

const Cart = () => {
  const [cart,setCart] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchCart=()=>{
      fetch("http://127.0.0.1:8000/api/cart/")
        .then((res)=>res.json())
        .then((data)=>{
          setCart(data)

          console.log(data.items)
          let totalAmount = 0;
          data.items.forEach((item) => {
            totalAmount += item.product.price * item.quantity;
        });
        setTotal(totalAmount.toFixed(2));

        })
      };
      

    useEffect(()=>{
        fetchCart();
    },[]);


    const updateQuantity=(item_id,quantity)=>{
      fetch("http://127.0.0.1:8000/api/cart/update/",{
        method: "POST",
        headers : { "Content-Type": "application/json" },
        body: JSON.stringify({item_id:item_id,quantity})
      }).then(fetchCart);
    };

    if (!cart) return <p>Loading...</p>

    return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.items.length === 0 && <p>Cart is empty</p>}

      {cart.items.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-gray-500">₹{item.product.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 bg-gray-200"
            >−</button>

            <span>{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 bg-gray-200"
            >+</button>
          </div>
        </div>
      ))}

      {/* Total Price */}
      <p className="text-lg mb-4">
        <strong>Total Price:</strong> ${total}
      </p>

      <button
        onClick={() => window.location.href = "/checkout"}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
      >
        Proceed to Checkout
      </button>

    </div>
  )
}

export default Cart;
