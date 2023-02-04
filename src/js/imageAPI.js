import axios from "axios";

const API_KEY = "33353171-e9933df598e4c8ee259954fe1";
axios.defaults.baseURL = "https://pixabay.com/api/";

class ImageApi {
    constructor(){
        this.searchQuery = "";
        this.page = 1;
    }

    async fetchImages() {
        const options = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            per_page: 40,
            page: this.page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearh: true,
            
        });
        const {data} = await axios(`?${options}`)
        this.incrementPage();
        return data;
    }

    get _searchQuery(){
        return this.searchQuery;
    }

    set _searchQuery(newQuery){
        this.searchQuery = newQuery;
    }

    incrementPage(){
        this.page +=1;
    }

    resetPage(){
        this.page = 1;
    }
}

export const imageApi = new ImageApi();

