import styles from './searchResult.module.css'
import { useHorizontalScroll } from '../../../../hooks/useScroll';
import { useMemo } from 'react';

const HistogramTable = ({ histogramsData, searchParams }) => {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();
  const monthlyData = useMemo(() => {
    if (!histogramsData?.data || !Array.isArray(histogramsData.data)) {
      return [];
    }

    const [totalDocumentsData, riskFactorsData] = histogramsData.data;

    if (!totalDocumentsData?.data || !riskFactorsData?.data) {
      return [];
    }
    const riskFactorsMap = {};
    riskFactorsData.data.forEach(item => {
      riskFactorsMap[item.date] = item.value;
    });

    const formattedData = totalDocumentsData.data.map(item => {
      const date = new Date(item.date);

      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const displayDate = `${month}.${year}`;

      const risks = riskFactorsMap[item.date] || 0;

      return {
        date: item.date,
        displayDate,
        total: item.value,
        risks
      };
    });

    return formattedData;
  }, [histogramsData]);

  const filteredAndSortedData = useMemo(() => {
    if (!monthlyData.length) return [];

    let result = [...monthlyData];

    if (searchParams?.startDate && searchParams?.endDate) {
      const startDate = new Date(searchParams.startDate);
      const endDate = new Date(searchParams.endDate);

      result = result.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [monthlyData, searchParams]);

  const totalStats = useMemo(() => {
    return filteredAndSortedData.reduce((acc, item) => ({
      totalDocuments: acc.totalDocuments + item.total,
      totalRisks: acc.totalRisks + item.risks
    }), { totalDocuments: 0, totalRisks: 0 });
  }, [filteredAndSortedData]);

  if (!histogramsData?.data || filteredAndSortedData.length === 0) {
    return (
      <div className="histogram-container">
        <p>Нет данных для отображения гистограммы</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.histogram}>
        <h3 className={styles.histogram__title}>
          Общая сводка
        </h3>
        <p>Найдено {totalStats.totalDocuments} вариантов</p>
      </div>
      <div className={styles.histogram__count}>
        <button className={styles.histogram__navBtn} onClick={scrollLeft}>
          <img src="images/nextscroll.svg" alt="" />
        </button>
        <div className={styles.histogram__container}>
          <div className={styles.histogram__tableTitle}>
            <div className={styles.histogram__titleRow}>
              <p className={styles.histogram__periodHeader}>
                Период
              </p>
              <p className={styles.histogram__rowLabel}>
                Всего
              </p>
              <p className={styles.histogram__rowLabelRisk}>
                Риски
              </p>
            </div>
          </div>
          <div className={styles.histogram__table}>
            <div className={styles.histogram__scrollContainer} ref={scrollRef}>
              {filteredAndSortedData.map((item, index) => (
                <div key={index} className={styles.histogram__scrollItem}>
                  <div className={styles.histogram__text}>
                    <p className={styles.histogram__dateHeader}>
                      {item.displayDate}
                    </p>
                    <p className={styles.histogram__totalCell}>
                      {item.total}
                    </p>
                    <p className={styles.histogram__riskCell}>
                      {item.risks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className={styles.histogram__navBtn}
          onClick={scrollRight}>
          <img src="images/prevscroll.svg" alt="" />
        </button>
      </div>
    </>
  );
};

export default HistogramTable;