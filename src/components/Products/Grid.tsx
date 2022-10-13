import { StyledGrid } from "./gridStyles";
import imageBroken from "./../../assets/image_broken.png";


type GridProps = {
    product: any;
    keyItem: any;
    isCart?: boolean;
    addToCart?: (arg: any) => void;
    addQty?: (arg: any) => void;
    removeQty?: (arg: any) => void;
}

export default function Grid({product, keyItem, isCart, addToCart, addQty, removeQty} : GridProps) {
   
    function handleAddToCart() {
        addToCart?.(product);
    }

    function handleToAddQty() {
      addQty?.(product);
    }

    function handleToRemoveQty() {
      removeQty?.(product);
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