import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addProductInCart, getProduct } from "../api";
import PageTitle from "../components/PageTitle";
import ProductSlider from "../components/ProductsSlider";
import MainTheme from "../theme/MainTheme";
import styles from "./_productscreen.module.scss";

export default function ProductScreen(){
    const { state } = useLocation();
    const params = useParams();
    const { id } = params;
    const [product,setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(false);

    useEffect(()=>{
        const loadProduct = () => {
            if(state === null){
                getProduct(id).then(res=>{
                    if(res.statusCode === 200){
                        setProduct(res.data);
                    }else{
                        alert("Something went Worng");
                    }
                });
            }else{
                setProduct(state.product);
            }
        }
        loadProduct();
    },[])

    return (
        <MainTheme>
            {product && <PageTitle categories={product.categories} urlParams={params} title={product.name}/> }
            <div className={styles.productList}>
                <div className={styles.productPage}>
                    {product !==null && (<>
                    
                            <ProductSlider products={product.images} />
                               
                            <div className={styles.productInfo}>
                                <h4 style={{marginBottom:30}}>{product.name}</h4>
                                <h3>{product.price}</h3>
                                <div className={styles.description}>
                                    <p>{product.description}</p>
                                </div>
                                <div className={styles.sizesContainer}>
                                    {product.sizes.map((size)=>{
                                        return <div key={size.name} className={`${styles.sizeBox} ${size.name === selectedSize ? styles.selected : ''} ${!size.stock? styles.disabled : ''}`} onClick={()=>size.stock && setSelectedSize(size.name)}><span>{size.name}</span></div>
                                    })}
                                </div>
                                 
                                {selectedSize && 
                                    <div className={styles.addToCart}>
                                        <button onClick={()=> addProductInCart({product:product,amount:1,size:selectedSize})}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
                                            Add to cart
                                        </button>
                                    </div>
                                }
                                
                            </div>
                            
                        </>
                    )}
                </div>
            </div>

        </MainTheme>
    )
}