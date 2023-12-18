import { Routes, Route } from "react-router-dom"

import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

import "./shop.styles.scss"

const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			{/*  dynamic url paramater based route
			 */}
			<Route path=':category' element={<Category />} />
		</Routes>
	)
}

export default Shop
