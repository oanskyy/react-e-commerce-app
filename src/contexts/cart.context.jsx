import { createContext, useEffect, useState } from "react"

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

// export const removeCartItem = (cartItems, cartItemToRemove) => {
export const removeCartItem = (cartItems, productToRemove) => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === productToRemove.id
	)

	// if quantitty =1, remove item from cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
	}

	// return back cart items with mathing cart item with reduced quantity
	return cartItems.map(cartItem =>
		cartItem.id === productToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	)
}

export const clearCartItem = (cartItems, productToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0
})

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		)
		setCartCount(newCartCount)
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		)
		setCartTotal(newCartTotal)
	}, [cartItems])

	const addItemToCart = productToAdd =>
		setCartItems(addCartItem(cartItems, productToAdd))
	const removeItemFromCart = productToRemove =>
		setCartItems(removeCartItem(cartItems, productToRemove))
	// const removeItemFromCart = cartItemToRemove =>
	// 	setCartItems(addCartItem(cartItems, productToRemove))
	const clearItemFromCart = productToClear =>
		setCartItems(clearCartItem(cartItems, productToClear))

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		cartTotal,
		removeItemFromCart,
		clearItemFromCart
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
