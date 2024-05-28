import axios from "axios";

export const API_URL = `http://localhost:8080/`;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhemxpZGRpbmtoYXlydWxsYWV2NEBnbWFpbC5jb20iLCJpZCI6IjY2NTA3OTU2NDVmMmMyZGJkMzkwNmUyOSIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE3MTY4MDAyODEsImV4cCI6MTcxNzIzMjI4MX0.vmObgCszuK0JhSk7I07qCAH1xuar3GVrxyTgOexVVkM'; // Replace with the actual token

const $axios = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}`+'api',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export default $axios;
