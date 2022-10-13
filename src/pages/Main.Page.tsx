import { useContext, useEffect, useState } from "react";
import ProductContainer from "../components/Products/ProductContainer";
import { StyledContentContainer } from "../styles/StyledContentContainer";
import { globalContext } from "../store/GlobalStore";
import api from "./../api";

export default function Main() {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { globalState, dispatch } = useContext(globalContext);
    let localCarts = globalState.carts as any;

    useEffect(() => {
        executeGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    function executeGetProducts() {
        setIsLoading(true);
        api.getProducts()
        .then((data: any) => {
            setIsLoading(false);
            setProducts(data.products);
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error.message);
        })
    }

    function searchProduct(val: string) {
        if (val !== "") {
            setIsLoading(true);
            api.searchProducts(val)
            .then((data) => {
                setIsLoading(false);
                setProducts(data.products);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.message);
            })
         } else {
            executeGetProducts();
         }
    }


    function handleOnKeypress(e: React.KeyboardEvent<any>) {
        if (e.key === "Enter") {
            searchProduct(searchText);
        }
    }

    function handleAddToCart(product: any) {
        const getQty = localCarts.filter((obj: any) => obj.id === product.id) as any
        if (getQty.length > 0) {
          const subtotal = parseInt(getQty[0].itemSubTotal) + parseInt(product.price);
          getQty[0].qty = getQty[0].qty + 1;
          getQty[0].itemSubTotal = subtotal.toString();
          const foundIndex = localCarts.findIndex((obj: any) => obj.id === product.id);
          localCarts[foundIndex] = getQty[0];
        } else {
          const newObj =  {
            title: product.title,
            images: product.images,
            brand: product.brand,
            id: product.id,
            qty: 1,
            itemSubTotal: product.price,
            price: product.price,
          };
          localCarts.push(newObj);
        }
        dispatch({ type: "SET_CART", value: localCarts });
    }
    
    return (
        <StyledContentContainer>
            <div className="top-filter-container">
                <div className="input-filters">
                    <input className="input-style" onKeyDown={(e) => handleOnKeypress(e)} onChange={(e) =>  setSearchText(e.target.value)} placeholder="Search movie"></input>
                    <button className="search-btn-style" onClick={() => searchProduct(searchText)}>Search</button>
                </div>
            </div>
            <ProductContainer products={products} loading={isLoading} error={error} addToCart={(product) => handleAddToCart(product)} ></ProductContainer>
        </StyledContentContainer>
    )
}