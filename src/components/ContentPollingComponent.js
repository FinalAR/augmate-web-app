import React, { useEffect, useState } from 'react';
import axios from 'axios';

import getApiUrl from '../utility/apiUtils';


const ContentPollingComponent = ({ phashId, initialDocumentId, initialRefVer, onContentChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('Content is up-to-date');

  useEffect(() => {
    const pollAPI = async () => {
      try {
        setLoading(true);
        const response = await axios.get(getApiUrl(`content/listner/${phashId}`), {
          params: {
            documentId: initialDocumentId,
            ref_ver: initialRefVer
          }
        });

        // alert(JSON.stringify(response.data));
        if (response.data.data.updateFlag == 'Y') {
          // Content has changed, handle accordingly
          setMessage('Content has changed');
          console.log('Content has changed:', response.data);
          onContentChange(response.data.data.document);

        } else {
          // Content is up-to-date
          setMessage('Content is up-to-date');
          console.log('Content is up-to-date');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const pollingInterval = setInterval(pollAPI, 10000); // Poll every 10 seconds

    return () => clearInterval(pollingInterval); // Clean up interval on unmount

  }, [phashId, initialDocumentId, initialRefVer, onContentChange]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ContentPollingComponent;
