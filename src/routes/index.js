import React from "react";
import { Redirect } from "react-router-dom";


import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

import Dashboard from "../pages/Dashboard/index";
import ProductList from "../pages/Products/ProductList";
import AddProduct from "../pages/Products/AddProduct";
import ProductChecks from "../pages/Products/ProductChecks";
import ProductOrders from "../pages/Orders/ProductOrders";
import CheckOut from "../pages/Orders/CheckOut";
import EditProduct from "../pages/Products/EditProduct";
import Shops from "../pages/Settings/Shops";
import Status from "../pages/Settings/Status";
import Working from "../pages/Settings/Working";

const authProtectedRoutes = [

	{ path: "/vendor/statistics", component: Dashboard },

	{path: "/vendor/product-list", component: ProductList},
	{path: "/vendor/product-add", component: AddProduct},
	{path: "/vendor/product-edit", component: EditProduct},
	{path: "/vendor/product-check", component: ProductChecks},

	{path: "/vendor/product-order", component: ProductOrders},
	{path: "/vendor/check-out", component: CheckOut},

	{path: '/vendor/shops', component: Shops},
	{path: '/vendor/status', component: Status},
	{path: '/vendor/working', component: Working},


	{ path: "/", exact: true, component: () => <Redirect to="/vendor/statistics" /> }
];

const publicRoutes = [
	{ path: "/vendor/logout", component: Logout },
	{ path: "/vendor/login", component: Login },
	{ path: "/vendor/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
