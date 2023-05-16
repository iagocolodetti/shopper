
import api from './api';

async function validate(products) {
    try {
        return await api.put('/product', { products });
    } catch (error) {
        throw error;
    }
}

export default {
    validate
}