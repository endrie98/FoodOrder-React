import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem'

const Cart = () => {
    const CartCtx = useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)

    const cartTotal = CartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    }, 0)

    function handleCloseCart() {
        UserProgressCtx.hideCart()
    }

    function handleGoToCheckout() {
        UserProgressCtx.showCheckout()
    }

    return (
        <Modal className="cart" open={UserProgressCtx.progress === "cart"} onClose={UserProgressCtx.progress === "cart" ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {CartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onDecrease={() => CartCtx.removeItem(item.id)}
                        onIncrease={() => CartCtx.addItem(item)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button onClick={handleCloseCart} textOnly={true}>Close</Button>
                { CartCtx.items.length > 0 ? <Button onClick={handleGoToCheckout} textOnly={false}>Go to Checkout</Button> : null }
            </p>
        </Modal>
    )
}

export default Cart
