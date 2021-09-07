import './sass/main.scss';
import galleryCards from './templates/item-template.hbs';
import { refs } from './refs';
import PixabyApiService from './apiService';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, success, defaultModules } from '@pnotify/core';

const pixabyApiService = new PixabyApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
//refs.galleryContainer.addEventListener('click', onClick);

function onSearch(e) {
  e.preventDefault();

  pixabyApiService.query = e.currentTarget.elements.query.value;
  pixabyApiService.resetPage();
  pixabyApiService.fetchArticles().then(data => {
    if (data.length <= 0) {
      error({
      text: 'Изображение не найдено.',
      delay: 1500,
    });
      console.log('data 0')
       refs.loadMoreBtn.classList.add('is-hidden');
    }
    else {
      errorResult(data);
      clearArticlesContainer();
        refs.loadMoreBtn.classList.add('is-open');
    }
  });

}

function errorResult(data) {
 
  pixabyApiService.fetchArticles().then(appArticlesMarkup);
  return;
}

function onLoadMore(e) {
  e.preventDefault();

  pixabyApiService
    .fetchArticles()
    .then(appArticlesMarkup)
    .then(() => {
      refs.loadMoreBtn.scrollIntoView({ block: 'end', behavior: 'smooth' });
      success({ text: 'Добавлено больше ответов' });
    });
}

function appArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryCards(hits));
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}

//123123