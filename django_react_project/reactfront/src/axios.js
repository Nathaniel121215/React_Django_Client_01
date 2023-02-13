import axios from 'axios';

export const getItems = () => {
    return axios.get('/api/items/');
};

export const addItem = (item) => {
    return axios.post('/api/items/', item);
};

export const updateItem = (itemId, item) => {
    return axios.put(`/api/items/${itemId}/`, item);
};

export const deleteItem = (itemId) => {
    return axios.delete(`/api/items/${itemId}/`);
};