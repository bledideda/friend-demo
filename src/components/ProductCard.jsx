import { useEffect, useState } from "react";
import styles from "./_productcard.module.scss";

export default function ProductCard({product, goTo}) {
    const [activeImage,setAtiveImage] = useState(0);

    // getBasket
    

    useEffect(()=>{
        const preloadImages = () => {
            new Image().src = product.images[0];
            new Image().src = product.images[1];
        }
    })
    return (
        <div  
            className={styles.product} 
            onClick={()=>goTo(product)} 
            onMouseEnter={()=>setAtiveImage(1)} 
            onMouseLeave={()=>setAtiveImage(0)}
        >
            <div className={styles.productImage} style={{backgroundImage: `url(${product.images[activeImage]})`}}/>
            <div className={styles.info}>
                {product.name}<br/>
                {product.price}
            </div>
        </div>
    )
}