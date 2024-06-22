import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  console.log("Printing Cart");
  console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="flex items-start justify-center max-w-6xl mx-auto p-8 mt-24">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1 lg:max-h-screen overflow-y-auto no-scrollbar pr-4">
            {cart.map((item, index) => {
              return <CartItem key={item.id} item={item} itemIndex={index} />;
            })}
          </div>

          <div className="lg:ml-8 mt-8 lg:mt-O p-6 flex flex-col justify-between h-[80vh] w-full lg:w-1/3 lg:sticky lg:top-20">
            <div>
              <div className="font-semibold uppercase text-sm text-green-700">Your Cart</div>
              <div className="text-4xl uppercase -mt-1 text-green-700 font-bold">Summary</div>
              <p className="text-lg mt-3 text-[16px]">
                <span className="font-semibold text-gray-700">Total Items: {cart.length}</span>
              </p>
            </div>

            <div className="text-lg text-gray-700 font-semibold">
              <p className="mb-1">Total Amount: ${totalAmount}</p>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 w-full rounded hover:bg-green-700 transition duration-300">CheckOut Now</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-black-500 font-bold uppercase">
          <h1>Cart Empty</h1>
          <Link to={"/"}>
            <button className="border border-gray-300 py-2 px-4 text-[14px] rounded-md text-white font-semibold mt-4 bg-green-600">Shop Now</button>
          </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
