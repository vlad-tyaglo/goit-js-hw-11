import { imageApi } from "./js/imageAPI";
import { renderGalleryMarkUp, clearGalleryMarkUp } from "./js/renderFunctions";
import { refs } from "./js/refs";
import { Notify } from "notiflix";



refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
    event.preventDefault();
    const searchQuery = event.target.searchQuery.value.trim();
    if(!searchQuery) {
        Notify.warning('Please, enter the text');
        return;
    }

    const {hits, totalHits} = await imageApi.fetchImages();
    renderGalleryMarkUp(hits)
   
}