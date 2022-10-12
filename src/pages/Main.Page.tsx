import { useEffect, useState } from "react";
import ProductContainer from "../components/Products/ProductContainer";
import { StyledContentContainer } from "../styles/StyledContentContainer";
import api from "./../api";

export default function Main() {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
    
    return (
        <StyledContentContainer>
            <div className="top-filter-container">
                <div className="input-filters">
                    <input className="input-style" onKeyDown={(e) => handleOnKeypress(e)} onChange={(e) =>  setSearchText(e.target.value)} placeholder="Search movie"></input>
                    <button className="search-btn-style" onClick={() => searchProduct(searchText)}>Search</button>
                </div>
                {/* <div className="button-filters">
                    <button className={`topRated-btn-style ${activeTopRated}`} onClick={() => handleFilterClicked("topRated")}>Top Rated</button>
                    <button className={`popular-btn-style ${activePopular}`} onClick={() => handleFilterClicked("popular")}>Popular</button>
                </div> */}
            </div>
            <ProductContainer products={products} loading={isLoading} error={error}></ProductContainer>
        </StyledContentContainer>
    )
}