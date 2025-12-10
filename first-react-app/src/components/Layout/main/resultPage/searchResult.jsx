import React, { useEffect, useState } from 'react';
import HistogramTable from './scrollHistogram';
import { processDocuments } from '../../../../services/searchApi';
import styles from './searchResult.module.css'

const SearchResults = ({ histogramsData, documentsData, searchParams }) => {
  const { startDate, endDate } = searchParams || {}
  const [processDocs, setProcessDocs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10)
  const extractImageFromXml = (xmlString) => {
    if (!xmlString) return null;
    try {
      const decodedXml = xmlString
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
      const imgRegex = /<img[^>]*src=["']([^"']*)["'][^>]*>/i;
      const match = decodedXml.match(imgRegex);

      if (match && match[1]) {
        return match[1];
      }

      return null;
    } catch (error) {
      console.error('Ошибка извлечения изображения:', error);
      return null;
    }
  };
  const extractTextFromXml = (xmlString) => {
    if (!xmlString) return '';

    return xmlString
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };
  useEffect(() => {
    const handleDocsProcessing = async () => {
      if (!documentsData || documentsData.length === 0) {
        setVisibleCount(10)
        setProcessDocs([])
        return;
      }
      try {
        const processed = processDocuments(documentsData)
        const enrichedDocs = processed.map(doc => {
          if (doc.ok) {
            const document = doc.ok;
            const markup = document.content?.markup;
            const content = extractTextFromXml(markup);
            const summary = content ? content.substring(0, 400) + (content.length > 400 ? '...' : '') : '';
            const imageUrl = extractImageFromXml(markup);
            return {
              ...doc,
              ok: {
                ...document,
                extractedContent: content,
                summary: summary,
                imageUrl: imageUrl
              }
            };
          }
          return doc;
        });

        setProcessDocs(enrichedDocs);
        setVisibleCount(10)
      } catch (error) {
        setProcessDocs([])
        setVisibleCount(10)
      } finally {
      }
    }
    handleDocsProcessing()
  }, [documentsData])

  const loadDocs = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }
  const visibleDocuments = processDocs.slice(0, visibleCount)
  const hasMoreDocuments = visibleCount < processDocs.length
  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString('ru-RU')
      : 'Не указана';
  };
  return (
    <section className={styles.searchResults}>
      {visibleDocuments && visibleDocuments.length > 0 ? (
        <div className={styles.searchResults__documents}>
          {histogramsData?.data && (
            <div className={styles.searchResults__histogram}>
              <HistogramTable
                histogramsData={histogramsData}
                searchParams={{ startDate, endDate }}
              />
            </div>
          )}
          <h3 className={styles.title}>Список документов</h3>
          <div className={styles.list}>
            {visibleDocuments.map((doc) => {
              const document = doc.ok;
              return (
                <article key={document.id} className={styles.documentCard}>
                  <div className={styles.documentCard__meta}>
                    <p>{formatDate(document.issueDate)}</p>
                    <a href={document.url} target="_blank"
                      rel="noreferrer noopener"
                    >
                      {document.source.name}
                    </a>
                  </div>

                  <div className={styles.documentCard__header}>
                    <h4 className={styles.documentCard__title}>
                      {document.title.text}
                    </h4>
                  </div>

                  {document.imageUrl && (
                    <div className={styles.documentCard__image}>
                      <img
                        src={document.imageUrl}
                        alt=""
                        className={styles.documentCard__img}
                      />
                    </div>
                  )}

                  {document.extractedContent ? (
                    <div className={styles.documentCard__content}>
                      <p className={styles.documentCard__summary}>
                        {document.summary}
                      </p>
                    </div>
                  ) : (
                    <p className={styles.documentCard__noContent}>
                      Нет содержимого для отображения
                    </p>
                  )}
                  <div className={styles.documentCard__footer}>
                    {document.url && (
                      <a
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.documentCard__link}
                      >
                        Читать в источнике
                      </a>
                    )}
                    {document.attributes?.wordCount && (
                      <span className={styles.documentCard__wordCount}>
                        {document.attributes.wordCount} слов
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          {hasMoreDocuments && (
            <div className={styles.loadMore}>
              <button
                onClick={loadDocs}
                className={styles.loadMoreBtn}
              >
                Показать больше
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Документы не найдены</p>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
