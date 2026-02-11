export const API_BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  const expire = localStorage.getItem('tokenExpire');
  if (expire && new Date(expire) < new Date()) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpire');
    throw new Error('Token expired')
  }

  if (!token) {
    throw new Error('No auth token')
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
};

export const fetchAccountInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/account/info`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    if (result && result?.eventFiltersInfo) {
      const limits = {
        companyLimit: result.eventFiltersInfo.companyLimit,
        usedCompanyCount: result.eventFiltersInfo.usedCompanyCount
      };
      return limits
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const formatSearchRequest = (data) => {
  return {
    issueDateInterval: {
      startDate: `${data.startDate}T00:00:00+03:00`,
      endDate: `${data.endDate}T23:59:59+03:00`,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: parseInt(data.inn),
            maxFullness: data.maxFullness,
            inBusinessNews: null,
          }
        ],
        onlyMainRole: data.onlyMainRole,
        tonality: data.tonality,
        onlyWithRiskFactors: false,
        riskFactors: { and: [], or: [], not: [] },
        themes: { and: [], or: [], not: [] }
      },
      themesFilter: { and: [], or: [], not: [] }
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: []
    },
    attributeFilters: {
      excludeTechNews: !data.includeTechNews,
      excludeAnnouncements: !data.includeAnnouncements,
      excludeDigests: !data.includeDigests
    },
    similarMode: "duplicates",
    limit: data.documentCount,
    sortType: "sourceInfluence",
    sortDirectionType: "desc"
  };
};

export const searchObjects = async (requestData) => {
  const response = await fetch(`${API_BASE_URL}/objectsearch`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(requestData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ошибка поиска! Статус: ${response.status}, ${errorText}`);
  }

  return await response.json();
};

export const getHistograms = async (requestData) => {

  const histogramRequestBody = {
    issueDateInterval: requestData.issueDateInterval,
    searchContext: requestData.searchContext,
    searchArea: requestData.searchArea,
    attributeFilters: {
      excludeTechNews: !requestData.attributeFilters.includeTechNews,
      excludeAnnouncements: !requestData.attributeFilters.includeAnnouncements,
      excludeDigests: !requestData.attributeFilters.includeDigests
    },
    similarMode: requestData.similarMode,
    limit: requestData.limit,
    sortType: requestData.sortType,
    sortDirectionType: requestData.sortDirectionType,
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };

  const response = await fetch(`${API_BASE_URL}/objectsearch/histograms`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(histogramRequestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ошибка гистограмм! Статус: ${response.status}, ${errorText}`);
  }

  const result = await response.json();
  return result;
};

export const getDocuments = async (documentIds) => {
  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ ids: documentIds })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ошибка документов! Статус: ${response.status}, ${errorText}`);
  }

  return await response.json();
};

export const processDocuments = (documents) => {

  const processedDocs = documents.map((doc, index) => {
    if (doc.ok) {
      const document = doc.ok;

      return {
        ok: {
          id: document.id,
          title: {
            text: document.title?.text,
            markup: document.title?.markup
          },
          issueDate: document.issueDate,
          url: document.url,
          attributes: document.attributes,
          source: {
            id: document.source.id,
            name: document.source?.name,
          },
          content: {
            markup: document.content?.markup
          },
          themes: document.themes || []
        }
      };
    } else if (doc.fail) {
      return { error: doc.fail };
    }
    return null;
  }).filter(Boolean);

  return processedDocs;
};

export const getDateRangeWarning = (startDate, endDate) => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 365) {
      return "Период поиска превышает 1 год. Рекомендуется выбрать меньший период для точности поиска.";
    }
    if (diffDays < 1) {
      return "Период поиска менее 1 дня. Выберите более длительный период.";
    }
  }
  return null;
};
