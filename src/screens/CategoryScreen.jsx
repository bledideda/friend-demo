import MainTheme from "../theme/MainTheme";
import styles from "./_categoryscreen.module.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { preparePath, shuffleArray } from "../helpers";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PageTitle from "../components/PageTitle";

export default function CategoryScreen () {

    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const params = useParams();
    const { category, subcategory } = params;
    

    useEffect(()=>{
        const loadProducts = () => {
            getProducts({category:subcategory ? subcategory : category}).then(res=>{
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
        navigate(path);
    };

    return (
        <MainTheme>
            {products && products.length ? <PageTitle categories={products[0].categories} urlParams={params}/> : "" }
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