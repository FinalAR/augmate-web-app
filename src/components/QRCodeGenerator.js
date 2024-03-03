import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator({ perceptualHash }) {
  // Generate the QR code content based on the perceptual hash
  const qrCodeContent = `Perceptual Hash: ${perceptualHash}`;

  return (
    <div>
      <h2>QR Code</h2>
      <QRCode value={qrCodeContent} />
    </div>
  );
}

export default QRCodeGenerator;
