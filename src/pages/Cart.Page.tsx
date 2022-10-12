import { useContext, useEffect, useState } from "react";
import { StyledCommonContainer } from "../styles/StyledContentContainer"
import { globalContext } from "../store/GlobalStore";
import ProductContainer from "../components/Products/ProductContainer";


export default function Cart() {
    const { globalState } = useContext(globalContext);
    let localCarts = globalState.carts as any;

    return (
        <StyledCommonContainer>
            <div className="top-page-container">
                <div className="left-container">
                    <h2 style={{marginBottom: "0px"}}>Cart</h2>
                </div>
                <div className="right-container">
                </div>
            </div>
            {localCarts.length > 0 ? (
                    <ProductContainer products={localCarts} loading={false} error={""} isCart={true}></ProductContainer>
            )
            :
            <h2>No item in cart at the moment</h2>
            }
            
        </StyledCommonContainer>
    )
}