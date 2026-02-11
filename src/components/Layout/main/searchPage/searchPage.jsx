import React from 'react';
import { useSearchForm } from './useSearchForm';
import SearchForm from './searchForm';
import styles from './search.module.css'
import { LayoutSkeleton } from '../../../skeleton/skeleton';

const SearchPage = () => {
  const {
    formMethods,
    errors,
    isSubmitting,
    isFormValid,
    documentCount,
    startDate,
    endDate,
    isLoading,
    inn,
    onSubmit,
  } = useSearchForm();

  if (isLoading) {
    return (
      <div className={styles.searchResults__loading}>
        <div className={styles.searchResults__loadingTitle}>
          <h2 className={styles.searchResults__loadingText}>Ищем. Скоро будут результаты</h2>
          <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <div>
          <img src="images/searchLoading.png" alt="" />
        </div>
        <LayoutSkeleton />
      </div>
    );
  }

  return (
    <main className={styles.dataSearch}>
      <div className={styles.dataSearch__title}>
        <h1>Найдите необходимые данные в пару кликов.</h1>
        <div className={styles.titleImg}>
        <p>
          Задайте параметры поиска. <br />
          Чем больше заполните, тем точнее поиск
        </p>
          <img src="images/searchPageImgFile.svg" alt="Файл" />
        </div>
      </div>
      <div className={styles.dataSearch__content}>
        <SearchForm
          formMethods={formMethods}
          errors={errors}
          isSubmitting={isSubmitting || isLoading}
          isFormValid={isFormValid && !isLoading}
          documentCount={documentCount}
          startDate={startDate}
          endDate={endDate}
          inn={inn}
          onSubmit={onSubmit}
        />
        <div className={styles.contentImg__search}>
          <img className={styles.searchFile} src="images/searchPageImgFile.svg" alt="Файл" />
          <img className={styles.searchFolder} src="images/searchPageImgFolder.svg" alt="Папка" />
          <img className={styles.searchPhoto} src="images/searchPage.png" alt="Персонаж на фоне ракеты" />
        </div>
      </div>
      <div className={styles.dataSearch__form}>
      </div>
    </main>
  );
};

export default SearchPage;