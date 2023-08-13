import React, { useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_SECRET_ACCESS_KEY_ID,
  region: 'ap-northeast-2',
  signatureVersion: 'v4',
});

const ImageUpload = () => {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [file, setFile] = useState<any>(null);

  const handleFileSelect = (e: any) => {
    setFile(e.target.files[0]);
  };

  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: 'pom-demo',
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    const { Location } = await s3.upload(params).promise();
    setImageUrl(Location);
    console.log('uploading to s3', Location);
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
