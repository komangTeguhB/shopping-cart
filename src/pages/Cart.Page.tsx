import { useContext, useEffect, useState } from "react";
import { StyledCommonContainer } from "../styles/StyledContentContainer"
import { globalContext } from "../store/GlobalStore";
import ProductContainer from "../components/Products/ProductContainer";


export default function Cart() {
    const [total, setTotal] = useState(0);
    const { globalState, dispatch } = useContext(globalContext);
    let localCarts = globalState.carts as any;

    useEffect(() => {
        getTotal();   
    },[])

    function getTotal() {
        let counter = 0;
        for (let i=0; i < localCarts.length; i++) {
            if (localCarts[i].itemSubTotal) {
                counter = counter + parseInt(localCarts[i].itemSubTotal);
            }
        }
        setTotal(counter);
    }

    //Handling decrease and increase qty not done yet, the render should have used the local state, instead of props
    function handleToAddQty(product: any) {
       const getQty = localCarts.filter((obj: any) => obj.id === product.id) as any
      if (getQty.length > 0) {
          const subtotal = parseInt(getQty[0].itemSubTotal) + parseInt(product.price);
          getQty[0].qty = getQty[0].qty + 1;
          getQty[0].itemSubTotal = subtotal.toString();
          const foundIndex = localCarts.findIndex((obj: any) => obj.id === product.id);
          localCarts[foundIndex] = getQty[0];
      } 
      dispatch({ type: "SET_CART", value: localCarts });
      getTotal();
    }

    function handleToRemoveQty(product: any) {
      const getQty = localCarts.filter((obj: any) => obj.id === product.id) as any
      if (getQty.length > 0) {
          const subtotal = parseInt(getQty[0].itemSubTotal) - parseInt(product.price);
          getQty[0].qty = getQty[0].qty - 1;
          getQty[0].itemSubTotal = subtotal.toString();
          const foundIndex = localCarts.findIndex((obj: any) => obj.id === product.id);
          localCarts[foundIndex] = getQty[0];
      } 
      dispatch({ type: "SET_CART", value: localCarts });
      getTotal()
    }

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
                <>
                    <ProductContainer products={localCarts} loading={false} error={""} isCart={true} addQty={(product) => handleToAddQty(product)} removeQty={(product) => handleToRemoveQty(product)} ></ProductContainer>
                    <div className="content-container">
                        <div className="shadow-box">
                            <p><b>TOTAL: ${total}</b></p>
                        </div>
                    </div>
                </>
            )
            :
            <h2>No item in cart at the moment</h2>
            }
            
        </StyledCommonContainer>
    )
}