import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.Page";
import Cart from "./pages/Cart.Page";

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}