import { imageApi } from "./js/imageAPI";
import { renderGalleryMarkUp, clearGalleryMarkUp } from "./js/renderFunctions";
import { refs } from "./js/refs";
import { Notify } from "notiflix";



refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
    event.preventDefault();
    clearGalleryMarkUp();
    const searchQuery = event.target.searchQuery.value.trim();
    if(!searchQuery) {
        Notify.warning('Please, enter the text');
        return;
    }

    imageApi.searchQuery = searchQuery;
    const {hits, totalHits} = await imageApi.fetchImages();
    renderGalleryMarkUp(hits)
   
}