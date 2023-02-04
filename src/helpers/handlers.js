import { imageApi } from "../js/imageAPI"
import { renderGalleryMarkUp, clearGalleryMarkUp } from "../helpers/renderFunctions";
import { Notify } from "notiflix";
import { loadMoreBtn } from "../js/loadMoreBtn";

export async function onFormSubmit(event) {
    event.preventDefault();
    clearGalleryMarkUp();
    imageApi.resetPage();
    const searchQuery = event.target.searchQuery.value.trim();
    if(!searchQuery) {
        Notify.warning('Please, enter the text');
        return;
    }
    loadMoreBtn.hide();
    imageApi.searchQuery = searchQuery;

    try {
        const { hits } = await imageApi.fetchImages();

        if(hits.length === 0){
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return; 
        }
        renderGalleryMarkUp(hits);
        loadMoreBtn.show();
        checkHitsMax(hits);
    } catch (error) {
        console.log(error);
    } 
}

export async function onLoadMoreBtnClick(){
    try {
        loadMoreBtn.loading();
        const {hits, totalHits} = await imageApi.fetchImages();
        renderGalleryMarkUp(hits);
        loadMoreBtn.endLoading();
        checkHitsMax(hits);
    } catch (error) {
        console.log(error);
    }
}

function checkHitsMax(hits){
    if(hits.length < 40){
        Notify.info(`We're sorry, but you've reached the end of search results.`);
        loadMoreBtn.hide();
    }
}