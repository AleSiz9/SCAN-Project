import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatSearchRequest, searchObjects, getHistograms, getDocuments, processDocuments } from '../../../../services/searchApi';
import { SearchSchema } from '../../../../schemas/searchSchema'
import { useNavigate } from 'react-router-dom';

export const useSearchForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formMethods = useForm({
    resolver: zodResolver(SearchSchema),
    mode: 'onChange',
    defaultValues: {
      tonality: "any",
      documentCount: "",
      maxFullness: true,
      onlyMainRole: true,
      includeTechNews: false,
      includeAnnouncements: false,
      includeDigests: false,
    }
  });

  const { watch, formState: { errors, isSubmitting } } = formMethods;

  const documentCount = watch("documentCount");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const inn = watch("inn");

  const isFormValid = inn && startDate && endDate && documentCount > 0;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const requestData = formatSearchRequest(data);

      const searchResult = await searchObjects(requestData);
      let histogramsResult = null;
      let processedDocs = [];

      if (searchResult.items && searchResult.items.length > 0) {
        histogramsResult = await getHistograms(requestData);

        const maxDocuments = Math.min(data.documentCount, searchResult.items.length);
        const documentIds = searchResult.items.slice(0, maxDocuments).map(item => item.encodedId);

        const documentsResult = await getDocuments(documentIds);
        processedDocs = processDocuments(documentsResult);
      } else {
      }
      navigate('/results', {
        state: {
          searchResults: searchResult,
          histogramsData: histogramsResult,
          documentsData: processedDocs,
          searchParams: {
            startDate: data.startDate,
            endDate: data.endDate,
            inn: data.inn,
            documentCount: data.documentCount
          },
          isLoading: true
        }
      });
    } catch (error) {
      console.error("Ошибка поиска:", error);
      setError(error.message || "Произошла ошибка при поиске");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    formMethods,
    errors,
    isSubmitting,
    isLoading,
    isFormValid,
    onSubmit,
    documentCount,
    startDate,
    endDate,
    inn,
    error,
  };
};