import { StyledProductsContainer } from "./gridStyles";
import Grid from "./Grid";
import loadingIndicator from "./../../assets/loading_icon.gif";
import { useCallback, useEffect, useState } from "react";

type Props = {
    products: any[];
    loading: boolean;
    error?: string;
    isCart?: boolean
}

export default function ProductContainer({products, loading, error, isCart}: Props) {
    const [total, setTotal] = useState(0);

    const getTotal = useCallback(() =>{
        let counter = 0;
        for (let i=0; i < products.length; i++) {
            console.log(products[i]);
            if (products[i].itemSubTotal) {
                counter = counter + parseInt(products[i].itemSubTotal);
            }
        }
        setTotal(counter);
    },[])

     useEffect(() => {
        if (isCart) {
            getTotal()
        }
    },[getTotal, isCart])

    

    const renderProductGrid = () => {
        if (!isCart) {
            return products.map((element: any, index: number) => (
                    <div className="grid-item" key={`grid-${element.title}-${index}`}>
                        <Grid product={element} keyItem={`grid-${element.title}-${index}`} isCart={isCart}></Grid>
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
                    <Grid product={element} keyItem={`grid-${element.title}-${index}`} isCart={isCart}></Grid>
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
                {isCart &&
                <div className="content-container">
                    <div className="shadow-box">
                         <p><b>TOTAL: ${total}</b></p>
                    </div>
                </div>
                }
            </div>
        </StyledProductsContainer>
    )
}