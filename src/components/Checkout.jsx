import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'

const Checkout = () => {
    const CartCtx = useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)

    const cartTotal = CartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    }, 0)

    function handleSubmit(event) {
        event.preventDefault()

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order: {
                    items: CartCtx.items,
                    customer: customerData
                }
            })
        })
    }

    return (
        <Modal open={UserProgressCtx.progress === "checkout"} onClose={() => UserProgressCtx.hideCheckout()}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button onClick={() => UserProgressCtx.hideCheckout()} type="button" textOnly={true}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}

export default Checkout
