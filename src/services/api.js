//Base da URL: https://api.themoviedb.org/3/
//URL da API: movie/now_playing?api_key=c84c61f57be638e77eb8642807dd9cc6
import axios from "axios";

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;