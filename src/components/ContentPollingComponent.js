import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentPollingComponent = ({ phashId, initialDocumentId, initialRefVer, onContentChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pollAPI = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/v1/content/listner/'+phashId, {
          params: {
            documentId: initialDocumentId,
            ref_ver: initialRefVer
          }
        });

        if (response.data.updateFlag === 'Y') {
          // Content has changed, handle accordingly
          console.log('Content has changed:', response.data);
          onContentChange(response.data.data.document);
        } else {
          // Content is up-to-date
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
        <p>Content is up-to-date</p>
      )}
    </div>
  );
};

export default ContentPollingComponent;
