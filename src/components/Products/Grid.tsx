import { useContext, useState } from "react";
import { StyledGrid } from "./gridStyles";
import imageBroken from "./../../assets/image_broken.png";
import { globalContext } from "../../store/GlobalStore";


type GridProps = {
    product: any;
    keyItem: any;
    isCart?: boolean;
}

export default function Grid({product, keyItem, isCart} : GridProps) {
    const { globalState, dispatch } = useContext(globalContext);
    let localCarts = globalState.carts;

    function handleAddToCart() {
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
          };
          localCarts.push(newObj);
        }
        dispatch({ type: "SET_FAVORITE", value: localCarts });
    }

    function handleToAddQty() {
      const getQty = localCarts.filter((obj: any) => obj.id === product.id) as any
      if (getQty.length > 0) {
          const subtotal = parseInt(getQty[0].itemSubTotal) + parseInt(product.price);
          getQty[0].qty = getQty[0].qty + 1;
          getQty[0].itemSubTotal = subtotal.toString();
          const foundIndex = localCarts.findIndex((obj: any) => obj.id === product.id);
          localCarts[foundIndex] = getQty[0];
      } 
      dispatch({ type: "SET_FAVORITE", value: localCarts });
    }

    function handleToRemoveQty() {
      const getQty = localCarts.filter((obj: any) => obj.id === product.id) as any
      if (getQty.length > 0) {
          const subtotal = parseInt(getQty[0].itemSubTotal) - parseInt(product.price);
          getQty[0].qty = getQty[0].qty - 1;
          getQty[0].itemSubTotal = subtotal.toString();
          const foundIndex = localCarts.findIndex((obj: any) => obj.id === product.id);
          localCarts[foundIndex] = getQty[0];
      } 
      dispatch({ type: "SET_FAVORITE", value: localCarts });
    }

    return (
       <StyledGrid>
          <div className="box-paper" id={keyItem} key={keyItem}>
            <p className="grid-title">
              <b>{product.title}</b><br />
              <b className="grid-subtitle">{product.brand}</b><br/>
              {!isCart && (<><b className="grid-subtitle">${product.price}</b><br/></>)}
              {product.itemSubTotal && <p className="grid-subtitle"><b>Subtotal: ${product.itemSubTotal} </b></p>}
            </p>
            <div
                className="image-container"
                id={"imgContainer-" + keyItem}
                key={"imgContainer-" + keyItem}
            >
              {product.images.length > 0 ? 
                <img
                  src={`${product.images[product.images.length - 1]}`}
                  alt="productImage"
                  id={"img-" + keyItem}
                  key={"img-" + keyItem}
                  width="100px"
                  height="150px"
                /> :
                <img
                  src={imageBroken}
                  alt="MovieImage"
                  id={"img-" + keyItem}
                  key={"img-" + keyItem}
                  width="190px"
                  height="250px"
                /> 
              }
            </div>
            {product.qty && <p><b>Qty: {product.qty} </b></p>}
            {!isCart ? <button className="input-btn-style" onClick={() => handleAddToCart()}>Add to cart</button>
            :
              (
                <>
                <button className="input-btn-style" onClick={() => handleToAddQty()}>Increase Qty</button>
                <button className="input-btn-style" onClick={() => handleToRemoveQty()}>Decrease Qty</button>
                </>
              )  
            }
          </div>
          
        </StyledGrid>
    )
}