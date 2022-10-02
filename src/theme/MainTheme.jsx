import { useState } from "react";
import AppHeader from "../components/AppHeader";
import CartPreview from "../components/CartPreview";
import styles from "./_maintheme.module.scss";

export default function MainTheme(props) {
    const [activeCart, setActiveCart] = useState(false);
    const toggleCart = () => {
        setActiveCart(prevState=>!prevState);
    }
    return (
        <div className={styles.app}>
            <AppHeader toggleCart={toggleCart} />
            <CartPreview toggleCart={toggleCart} isActive={activeCart} />
            <div className={styles.pageContent}>
                {props.children}
            </div>
            
        </div>
    )
}