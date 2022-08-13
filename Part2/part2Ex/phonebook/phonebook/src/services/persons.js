import axios from'axios'
const baseUrl = "http://localhost:3001/api/persons"

const getAll=()=> {
return    axios.get(baseUrl)
        .then(res=>res.data)
}

const create=()=> {
        return    axios.get(baseUrl)
                .then(res=>res.data)
        }


export default {getAll}
