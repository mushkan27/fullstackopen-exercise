import axios from "axios";

// const baseUrl = 'http://localhost:3001/persons';

//Integrating frontend with backend
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    return axios.get(baseUrl).then((result)=> result.data)
};

const create = (newContact) => {
    return axios.post(baseUrl, newContact).then((result)=>result.data)
};

const remove = (id)=> {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson)=> {
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

export default {getAll, create, remove, update}