import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

import { Scanner , useDeviceList, useContinuousScanner} from '@yudiel/react-qr-scanner';

import QRCode from 'qrcode.react';

function QRScanner() {
  const [qrData, setQRData] = useState(null);
  const [data, setData] = useState(null);

  const [deviceInput, setInput] = useState(useDeviceList())
  console.log(useDeviceList());

  console.log(deviceInput);
  console.log(deviceInput[0]);

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

  // return (
  // <>
  // {/* <Scanner
  //   onResult={(text, result) => console.log(text, result)}
  //   onError={(error) => console.log(error?.message)}
  //   enabled= {true}
  //   options= {"b6be7fff0dbb28f522ead65d0d80f035fe8a7833e07fe8fc18c23594d464e57d"}
  // /> */}
  // {/* <useContinuousScanner 
  //   onResult={(text, result) => console.log(text, result)}
  //   onError={(error) => console.log(error?.message)}
  // /> */}
  // </>
  // )
}

export default QRScanner;
