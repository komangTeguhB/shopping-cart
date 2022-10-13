import { StyledProductsContainer } from "./gridStyles";
import Grid from "./Grid";
import loadingIndicator from "./../../assets/loading_icon.gif";

type Props = {
    products: any[];
    loading: boolean;
    error?: string;
    isCart?: boolean;
    addToCart?: (arg: any) => void;
    addQty?: (arg: any) => void;
    removeQty?: (arg: any) => void
}

export default function ProductContainer({products, loading, error, isCart, addToCart, addQty, removeQty}: Props) {   

    const renderProductGrid = () => {
        if (!isCart) {
            return products.map((element: any, index: number) => (
                    <div className="grid-item" key={`grid-${element.title}-${index}`}>
                        <Grid product={element} keyItem={`grid-${element.title}-${index}`} isCart={isCart} addToCart={(product) => addToCart?.(product)}></Grid>
                    </div>
                ))
        } else {
            const result = products.reduce((unique: any, o: any) => {
                if(!unique.some((obj: any) => obj.id === o.id)) {
                  unique.push(o);
                }
                return unique;
            },[]);
            return result.map((element: any, index: number) => (
                <div className="grid-item" key={`grid-${element.title}-${index}`}>
                    <Grid product={element} keyItem={`grid-${element.title}-${index}`} isCart={isCart} addQty={(product) => addQty?.(product)} removeQty={(product) => removeQty?.(product)}></Grid>
                </div>
            ))
        }
    }

    return (
        <StyledProductsContainer>
            <div className="page-container">
                <div className="content-container">
                    <div className="shadow-box">
                        
                        {loading ? 
                         (<>
                            <img src={loadingIndicator} alt="loading"/>
                         </>)
                         :
                          error ?
                            <h2 style={{color: "red"}}>Fetching error: {error}</h2> :
                                    products.length > 0 ?
                                    renderProductGrid()
                                        : <></>
                        }
                        
                    </div>
                   
                </div>
            </div>
        </StyledProductsContainer>
    )
}