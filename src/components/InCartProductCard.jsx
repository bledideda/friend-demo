import { removeProduct, updateCart } from "../api";
import styles from "./_incartproductcard.module.scss";

export default function InCartProductCard({item}){

    const handleSubstract = () => {
        if(item.amount === 1){
            if(window.confirm("Do you want to remove form basket ?")){
                removeProduct(item);
            }  
        }else{
            updateCart(item, item.amount-1);
        }
    }

    const handleAdd = () => {
        updateCart(item, item.amount+1);
    }
    

    return (
        <div className={styles.product}>
            <div className={styles.image} style={{backgroundImage: `url(${item.product.images[0]})`}}></div>
            <div className={styles.description}>
                <div className={styles.name}>{item.product.name} | {item.size} </div>
                <p>{item.product.price}</p>
                <div className={styles.actions} >
                    <span onClick={handleSubstract}>-</span>
                    {item.amount}
                    <span onClick={handleAdd}>+</span>
                </div>
            </div>
        </div>
    )
}