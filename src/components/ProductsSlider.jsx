import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from "./_productslider.module.scss";

// import { Pagination } from "swiper";
import { useState } from 'react';

export default function ProductSlider({products}){
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiper, setSwiper] = useState(null);

    if(!products){
        return null;
    }

    const goToSlide = ( index ) => {
        swiper.slideTo(index);
    }
       
    return (
        <div className={styles.sliderContainer}>
            <div className={styles.control}>
                {products.map((product,index)=>(
                   
                    <div key={index} className={`${styles.button} ${activeIndex === index ? styles.active :""}`} style={{backgroundImage: `url(${product})`}} onClick={()=>goToSlide(index)}></div>
                    
                ))}
            </div>
            <div className={styles.slider}>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                    onSwiper={(swiper) => setSwiper(swiper)}
                >
                    {products.map((product,index)=>(
                        <SwiperSlide key={index}>
                            <div className={styles.slide} style={{backgroundImage: `url(${product})`}}></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
       
    );
};