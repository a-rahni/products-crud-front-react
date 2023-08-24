import axios from "axios";

// la logique appicative
export const productsApi = axios.create({
    baseURL : "http://localhost:9000"
});

// function getProducts(){
//     return productsApi.get("/products");
// }
// export const getProducts=()=>{
//     return productsApi.get("/products");
// }

export const getProducts=(keyword="", page=1, size=4)=>{
    // url ave parametres suivant json server
    return productsApi.get(`/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
}

export const deleteProduct=(product)=>{
   //return productsApi.delete("/products/"+product.id);
   return productsApi.delete(`/products/${product.id}`)
}

export const getProductById=(id)=>{
    //return productsApi.delete("/products/"+product.id);
    return productsApi.get(`/products/${id}`)
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
 



