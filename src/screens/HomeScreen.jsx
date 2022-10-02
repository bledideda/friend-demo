import MainTheme from "../theme/MainTheme";
import styles from "./_homescreen.module.scss";
import LogoImage from "../assets/images/logo.png"
import BgImage from "../assets/images/bg.png";
import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { preparePath, shuffleArray } from "../helpers";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function HomeScreen () {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        const loadProducts = () => {
            getProducts({}).then(res=>{
                if(res.statusCode===200){
                    // shuffleArray(res.data)
                    setProducts(shuffleArray(res.data));
                }else{
                    alert("Something went wrong. Please try again later")
                }
            })
        }
        loadProducts();
    },[])

    const goTo = (item) => {
        let path = preparePath(item.categories, item.id);
        navigate(path, {state:{ product: item }});
    };

    return (
        <MainTheme>
            <div className={styles.appSlider} style={{backgroundImage: `url(${BgImage})`}}>
                <img src={LogoImage}/>
            </div>
            <div className={styles.productList}>
                <div className={styles.products}>
                    {products.map((product,index)=>{
                        if(index > 15){
                            return null;
                        }
                        return (
                            <ProductCard key={product.id} product={product} goTo={goTo} />
                        )
                    })}
                    
                </div>
            </div>
        </MainTheme>
       
    )
}