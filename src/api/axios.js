import axios from 'axios'

const instance = axios.craete({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "467d317a1ccb047a2c344103925ec82e",
        language: "ko-KR",
    }
})

export default instance