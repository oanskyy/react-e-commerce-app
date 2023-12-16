import { createContext, useState } from "react"

export const addCartItem = (cartItems, productToAdd) => {
	// 1. find if cart items contains productsToAdd
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === productToAdd.id
	)

	// 2. If found, increment quantity
	if (existingCartItem) {
		return cartItems.map(cartItem =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	// 3. return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {}
})

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])

	const addItemToCart = product => setCartItems(addCartItem(cartItems, product))
	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems }

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
