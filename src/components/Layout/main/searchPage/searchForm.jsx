import InputForm from '../../../UI/inputForm';
import styles from './search.module.css'
import { getDateRangeWarning } from '../../../../services/searchApi';
import Button from '../../../UI/button';

const SearchForm = ({
  formMethods,
  errors,
  isSubmitting,
  isFormValid,
  documentCount,
  startDate,
  endDate,
  onSubmit,
}) => {
  const { register, handleSubmit } = formMethods;
  const dateRangeWarning = getDateRangeWarning(startDate, endDate);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.dataSearch__formGroup}
    >
      <div className={styles.formInputGroup}>
        <p className={styles.formInputGroup__gridInn}>
          <InputForm className={`${styles.formInputGroup__field} 
          ${errors?.inn ? styles.error : ''}`}
            placeholder='10 цифр'
            title={'ИНН компании*'}
            type={'text'}
            name={'inn'}
            id={'com-inn'}
            {...register('inn')}
            errors={errors}
            required
          />
        </p>
        <p className={styles.formInputGroup__gridTon}>
          <span>Тональность</span>
          <label htmlFor="tonality" >
            <select className={styles.formInputGroup__field}
              {...register('tonality')}
            >
              <option value="any">Любая</option>
              <option value="positive">Позитивная</option>
              <option value="negative">Негативная</option>
              <option value="neutral">Нейтральная</option>
            </select>
            {errors.tonality && (
              <span className='error-message'>
                {errors.tonality.message}
              </span>
            )}
          </label>
        </p>
        <p className={styles.formInputGroup__gridNumDocs}>
          <span>Колличество документ к выдаче*</span>
          <label htmlFor="num-docs">
            <input className={`${styles.formInputGroup__field} 
							${errors?.documentCount ? styles.error : ''}`}
              id='num-docs'
              type="number"
              placeholder='От 1 до 1000'
              {...register('documentCount')}
              min="1" max="1000" />
            {errors.documentCount && (<span className='error-message'>{errors.documentCount.message}</span>)}
            {documentCount > 800 && (
              <div className='error-hint'>
                Большое колличество документов может замедлить поиск
              </div>
            )}
          </label>
        </p>
        <p className={styles.formInputGroup__gridStartDate}>
          <span>Диапaзон поиска</span>
          <label htmlFor="start-date">
            <input
              className={`${styles.formInputGroup__field} 
								${styles.formInputGroup__fieldDateStart} 
								${errors?.startDate ? styles.error : ''}`
              }
              placeholder='Дата начала'
              type='date'
              id='start-date'
              {...register('startDate')}
              errors={errors}
              required
            />
          </label>
        </p>
        {dateRangeWarning && (
          <div className='error-message'>
            {dateRangeWarning}
          </div>
        )}
        <p className={styles.formInputGroup__gridEndDate}>
          <label htmlFor="end-date">
            <input
              className={`${styles.formInputGroup__field} 
								${styles.formInputGroup__fieldDateEnd} 
								${errors?.endDate ? styles.error : ''}`
              }
              type='date'
              placeholder='Дата конца'
              id='end-date'
              {...register('endDate')}
              errors={errors}
              required
            />
          </label>
        </p>
        <div className={styles.formGroup_errors}>
          {(errors?.startDate || errors?.endDate) && (
            <span className='error-message'>
              {errors?.startDate?.message || errors?.endDate?.message}
            </span>
          )}</div>
      </div>
      <div className={styles.formCheckboxGroup}>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Признак максимальной полноты'}
          type={'checkbox'}
          name={'maxFullness'}
          id={'max-fullness'}
          {...register('maxFullness')}
        /></div>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Упоминания в бизнес-контексте'}
          type={'checkbox'}
          name={'inBusinessNews'}
          id={'business-news'}
          {...register('inBusinessNews')}
        /></div>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Главная роль в публикации'}
          type={'checkbox'}
          name={'onlyMainRole'}
          id={'main-role'}
          {...register('onlyMainRole')}
        /></div>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Публикации только с риск-факторами'}
          type={'checkbox'}
          name={'onlyWithRiskFactors'}
          id={'risk-factors'}
          {...register('onlyWithRiskFactors')}
        /></div>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Включать технические новости рынков'}
          type={'checkbox'}
          name={'includeTechNews'}
          id={'tech-news'}
          {...register('includeTechNews')}
        /></div>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Включать анонсы и календари'}
          type={'checkbox'}
          name={'includeAnnouncements'}
          id={'announcements'}
          {...register('includeAnnouncements')}
        /></div>
        <div><InputForm className={styles.formCheckboxGroup__checkbox}
          title={'Включать сводки новостей'}
          type={'checkbox'}
          name={'includeDigests'}
          id={'digests'}
          {...register('includeDigests')}
        /></div>
      </div>
        <div className={styles.formHint}>
          <Button
            type={'submit'}
            disabled={isSubmitting || !isFormValid}
            className='authorization__button-form'
          >
            Поиск
            <div></div>
          </Button>
          <p>*Обязательные к заполнению поля</p>
        </div>
    </form>
  )
};

export default SearchForm;

