import React, { useContext } from 'react'

import logoImage from "../assets/logo.jpg"
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

const Header = () => {
    const CartCtx = useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)

    const totalCartItems = CartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    function handleShowCart() {
        UserProgressCtx.showCart()
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="A restaurant" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly={true}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header
