import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { categoryIcons } from "../utils/categoryIcons";

export default function SweetCard({ sweet }: any) {
  const { addToCart } = useContext(CartContext);
  const icon =
    categoryIcons[sweet.category] || categoryIcons.Default;

  return (
    <div className="card">
      <h3 className="card-title">
        {icon} {sweet.name}
      </h3>

      <span className="badge">
        {icon} {sweet.category}
      </span>

      <p>{sweet.description || "Delicious sweet treat"}</p>
      <p><strong>₹{sweet.price}</strong></p>

      {/* ✅ THIS WAS MISSING */}
      <button
        disabled={sweet.quantity === 0}
        onClick={() => addToCart(sweet)}
      >
        {sweet.quantity === 0
          ? "Out of Stock 🚫"
          : "Add to Cart 🛒"}
      </button>
    </div>
  );
}
