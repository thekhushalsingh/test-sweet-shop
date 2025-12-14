import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { categoryIcons } from "../utils/categoryIcons";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = async () => {
    for (const item of cart) {
      await api.post(`/sweets/${item.id}/purchase`, {
        quantity: item.quantity
      });
    }
    clearCart();
    alert("🎉 Purchase successful!");
  };

  return (
    <div className="cart">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 && (
        <p className="empty-text">Your cart is empty 🍩</p>
      )}

      {cart.map(item => {
        const icon =
          categoryIcons[item.category] || categoryIcons.Default;

        return (
          <div className="cart-item" key={item.id}>
            <div>
              <h4>
                {icon} {item.name}
              </h4>
              <p>₹{item.price} × {item.quantity}</p>
            </div>

            <div className="cart-actions">
              <p><strong>₹{item.price * item.quantity}</strong></p>
              <button onClick={() => removeFromCart(item.id)}>
                ❌ Remove
              </button>
            </div>
          </div>
        );
      })}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{total}</h3>
          <button className="checkout-btn" onClick={checkout}>
            Checkout 🚀
          </button>
        </div>
      )}
    </div>
  );
}
