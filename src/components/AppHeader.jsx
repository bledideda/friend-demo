import { useEffect, useState } from "react";
import { getCart } from "../api";
import styles from "./_appheader.module.scss";

export default function AppHeader({toggleCart}){
    const [cartLength, setCartLength] = useState(0);
    useEffect(()=>{
        const updateCartLength = ()=> {
            let cart = getCart();
            if(cart !== null){
                setCartLength(cart.length);
            }
        }
        document.addEventListener('cartUpdated', (e) => {
            updateCartLength()
        });
        updateCartLength();
    },[])
    
    return (
        <div className={styles.appHeader}>
            <div className={`${styles.flex} ${styles.justifySpaceBetween}`}>
                <div className={styles.hamburger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.flex}>
                    <div className={styles.actionButton}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg></span>
                    </div>
                    <div className={styles.actionButton} onClick={toggleCart}>
                        {cartLength ? <i>{cartLength}</i> : ""}
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg></span>
                    </div>
                    <div className={styles.actionButton}>
                        <div className={styles.currencySwitch}>
                            <span>
                                NOK<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}