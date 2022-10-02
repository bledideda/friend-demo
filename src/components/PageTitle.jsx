import { Link } from "react-router-dom";
import styles from "./_pagetitle.module.scss";

export default function PageTitle(props){
    const {categories, urlParams , title } = props;

    return (
        <div className={styles.pageTitle}>
                <h1>
                    <Link to={"/"}>Home</Link>/
                    <Link to={'/'+urlParams.category}>{categories[0]}</Link>
                    {urlParams.subcategory ? <>{"/"}<Link to={`/${urlParams.category}/${urlParams.subcategory}`}>{categories[1]}</Link></> :""}
                    {title && <Link to={`/${urlParams.category}/${urlParams.subcategory}/${urlParams.id}`}>{`/${title}`}</Link>}
                </h1>
        </div>
    )
}