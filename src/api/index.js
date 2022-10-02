import ApiService from "../services/ApiService";
import StorageService from "../services/StorageService";

const Service = new ApiService();
const Storage = new StorageService();

export const getProducts = async (data) => Service.postData("/products", data);
export const getProduct = async (id) => Service.getData(`/products/${id}`);
//STORAGE API's
export const addProductInCart = (item) => Storage.addItemInBasket(item);
export const getCart = () => Storage.getBasket();
export const updateCart = ( item, amount ) => Storage.updateBasket(item, amount);
export const removeProduct = (item) => Storage.removeItemFromBasket(item)