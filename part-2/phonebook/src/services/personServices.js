import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl).then((result)=> result.data)
};

const create = (newContact) => {
    return axios.post(baseUrl, newContact)
};

export default {getAll, create}