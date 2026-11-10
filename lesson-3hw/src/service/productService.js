import axios from "axios";

export const api = axios.create({
    baseURL: 'https://dummyjson.com'
});

export const productService = {
    getProducts: async (page, signal) => {
        const limit = 10;
        const skip = (page - 1) * limit;
        const response = await api.get('/products', {
            params: {
                limit,
                skip,
                select: 'id,title,description,price,category'
            },
            signal
        });
        return response.data;
    },
    searchProducts: async (query, page, signal) => {
        const limit = 10;
        const skip = (page - 1) * limit;
        const response = await api.get('/products/search', {
            params: {
                q: query,
                limit,
                skip,
                select: 'id,title,description,price,category'
            },
            signal
        });
        return response.data;
    }
}
