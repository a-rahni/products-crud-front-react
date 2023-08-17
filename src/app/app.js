import axios from "axios";

// la logique appicative
export const productsApi = axios.create({
    baseURL : "http://localhost:9000"
});

// function getProducts(){
//     return productsApi.get("/products");
// }
export const getProducts=()=>{
    return productsApi.get("/products");
}

export const deleteProduct=(product)=>{
   //return productsApi.delete("/products/"+product.id);
   return productsApi.delete(`/products/${product.id}`)
}

export const getProduct=(product)=>{
    //return productsApi.delete("/products/"+product.id);
    return productsApi.get(`/products/${product.id}`)
}

export const saveProduct=(product)=>{
    return productsApi.post(`/products`,product)
}

// update la valeur de l'attribut checked (toggle)
export const checkProduct=(product)=>{
    return productsApi.patch(`/products/${product.id}`,{checked:!product.checked})
}

export const updateProduct=(product)=>{
    return productsApi.put(`/products/${product.id}`,product)
}
 



