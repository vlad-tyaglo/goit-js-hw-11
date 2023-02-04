import axios from "axios";

const API_KEY = "33353171-e9933df598e4c8ee259954fe1";
axios.defaults.baseURL = "https://pixabay.com/api/";

class ImageApi {
    constructor(){
        this.searhQuery = "";
    }

    async fetchImages() {
        const options = new URLSearchParams({
            key: API_KEY,
            q: this.searhQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearh: true,
        });
        const {data} = await axios(`?${options}`)
        return data;
    }

    get _searchQuery(){
        return this.searhQuery;
    }

    set _searchQuery(newQuery){
        this.searhQuery = newQuery;
    }
}

export const imageApi = new ImageApi();

