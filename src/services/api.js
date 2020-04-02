import axios from 'axios';

const api = axios.create({
    baseURL: 'https://covid-193.p.rapidapi.com/',
    headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "14466add01msh259841858e97009p17b3c9jsn764794c5b224"   
    }
});

export default api;