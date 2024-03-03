import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

import QRCode from 'qrcode.react';

function QRScanner() {
  const [qrData, setQRData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQRData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {qrData ? (
        <div>
          <p>Scanned Data: {qrData}</p>
          {/* Use qrData to extract the perceptual hash value and use it in your AR application */}
        </div>
      ) : (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      )}
      {qrData && <QRCode value={qrData} />}
    </div>
  );
}

export default QRScanner;
