import axios from 'axios'
// const baseUrl = "http://localhost:3001/notes"
const baseUrl = "http://localhost:3001/api/notes/"

const getAll = () => {
    return axios.get(baseUrl)
                .then(res=>res.data)
}
const create = (newObj) => {
    return axios.post(baseUrl,newObj)
                .then(res=>res.data)
}
const edit = (id,editObj) => {
    return axios.put(`${baseUrl}/${id}`,editObj)
                .then(res=>res.data)
}

export default {getAll,create,edit}