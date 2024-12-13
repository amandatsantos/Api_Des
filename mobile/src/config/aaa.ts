import axios from "axios";

const instance = axios.create({
    baseURL: "192.168.137.74:5265",
    timeout: 9500,
    headers:{
        "Content-Type": "application/json",
    },
})

export default instance;