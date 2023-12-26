import { createContext, useReducer } from "react"
import { createAction } from "../utils/reducer/reducer.utils"

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

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0
}

const cartReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		//reducer should not handle any business logic
		case "SET_CART_ITEMS":
			return {
				...state,
				...payload
			}
		case "SET_IS_CART_OPEN":
			return {
				...state,
				isCartOpen: payload
			}
		default:
			throw new Error(`unhandled type of ${type} in cartReducer`)
	}
}

export const CartProvider = ({ children }) => {
	const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE)

	const updateCartItemsReducer = newCartItems => {
		// generate newCartTotal
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		)
		// generate newCartCount
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		)

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount
			})
		)
	}

	const addItemToCart = productToAdd => {
		const newCartItems = addCartItem(cartItems, productToAdd)
		updateCartItemsReducer(newCartItems)
	}
	const removeItemFromCart = productToRemove => {
		const newCartItems = removeCartItem(cartItems, productToRemove)
		updateCartItemsReducer(newCartItems)
	}
	// const removeItemFromCart = cartItemToRemove =>
	// 	setCartItems(addCartItem(cartItems, productToRemove))
	const clearItemFromCart = productToClear => {
		const newCartItems = clearCartItem(cartItems, productToClear)
		updateCartItemsReducer(newCartItems)
	}

	const setIsCartOpen = bool => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
	}

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
