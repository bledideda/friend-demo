import { useEffect, useState } from "react";
import { getCart } from "../api";
import InCartProductCard from "./InCartProductCard";
import styles from "./_cartpreview.module.scss"

export default function CartPreview({isActive, toggleCart}){

    const [ cart, setCart ] = useState(null);
    const [ cartAmount, setCartAmount] = useState(0);
    useEffect(()=>{
        const calculateTotal = () => {
            if(cart !== null){
                let am = 0;

                cart.forEach((item)=>{
                    let price = item.product.price.split(/\s+/);
                    am = am + parseInt(price[0]) * item.amount;
                })

                setCartAmount(am);
            }
        }
        calculateTotal();
    },[cart])

    useEffect(()=>{
        const refreshCart = ()=> {
            let cart = getCart();
            if(cart !== null){
                setCart(cart);
                
            }
        }
        document.addEventListener('cartUpdated', () => {
            refreshCart()
        });
        refreshCart();
    },[])

    return (
        <div className={`${styles.cartPreview} ${isActive? styles.active : ''}`}>
            {cart !== null && cart.length ?
                <>
                   <button className={styles.closeCart} onClick={toggleCart}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 88L32 208c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l288 0 0 88c0 9.6 5.7 18.2 14.5 22z"/></svg></button>
                   <div className={`${styles.cartBody} ${styles.flexColumn}`}>
                        <div className={styles.cartItmesList}>
                            {
                                cart.map(item=>{
                                    return (
                                        <InCartProductCard key={item.product.id+item.size} item={item}/>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.cartActions}>
                            <span>Total: {cartAmount.toLocaleString()} NOK</span>
                            <span className={styles.checkoutButton} onClick={()=>alert("CHECKOUT PAGE UNDER DEVELOPMENT :P")}>Go to checkout</span>
                        </div>
                   </div>
                </>
            :
                <>
                    <button className={styles.closeCart} onClick={toggleCart}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 88L32 208c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l288 0 0 88c0 9.6 5.7 18.2 14.5 22z"/></svg></button>
                    <div className={styles.cartBody}>Cart is empty</div>
                </>
            }
        </div>
    )
}