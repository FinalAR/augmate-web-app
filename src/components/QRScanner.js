import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

import QRCode from 'qrcode.react';

function QRScanner() {
  const [qrData, setQRData] = useState(null);
  const [data, setData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQRData(data);
      console.log(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
  <div>
  <h1>QR Code Scanner</h1>
  {data ? (
    <div>
      <p>Scanned Data: {data}</p>
      <QRCode value={data} />
    </div>
  ) : (
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      onResult={(result, error) => {
      if (!!result) {
        setData(result?.text);
      }

      if (!!error) {
        console.info(error);
      }
    }}
      style={{ width: '100%' }}
    />
  )}
</div>
  );
}

export default QRScanner;
