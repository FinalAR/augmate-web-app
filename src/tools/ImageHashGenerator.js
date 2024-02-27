import React, { useState } from 'react';
// import pHash from 'phash-js';

const ImageHashGenerator = () => {
  const [hashValue, setHashValue] = useState('');
  const [hashHexValue, setHashHexValue] = useState('');
  const [hashIntValue, setHashIntValue] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const hash = await window.pHash.hash(file);
      setHashValue(hash.value);
      setHashHexValue(hash.toHex());
      setHashIntValue(hash.toInt());
    } catch (error) {
      console.error('Error generating hash:', error);
    }
  };

  return (
    <div>
      <input id="input" type="file" accept="image/*" onChange={handleFileChange} />
      <div>
        <label>Generated Hash:</label>
        <div>{hashValue}</div>
        <div>{hashHexValue}</div>
        <div>{hashIntValue}</div>
      </div>
    </div>
  );
};

export default ImageHashGenerator;
