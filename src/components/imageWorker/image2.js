import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Image, Card, Button } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const App = ({ initialPhotos = [], onPhotosChange = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState(initialPhotos);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        const newPhoto = {
          uid: info.file.uid,
          url,
          name: info.file.name,
          status: 'done',
        };
        const newPhotos = [...photos, newPhoto];
        setPhotos(newPhotos);
        onPhotosChange(newPhotos);
      });
    }
    if (info.file.status === 'error') {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleRemove = (uid) => {
    const newPhotos = photos.filter((photo) => photo.uid !== uid);
    setPhotos(newPhotos);
    onPhotosChange(newPhotos);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex vertical gap="middle">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://karadon.ru:8553/api/photo/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>

      <Flex gap="small" wrap="wrap">
        {photos.map((photo) => (
          <Card
            key={photo.uid}
            hoverable
            style={{ width: 100, position: 'relative' }}
            bodyStyle={{ padding: 0 }}
            cover={
              <Image
                src={photo.url}
                alt={photo.name}
                style={{ width: '100%', height: 100, objectFit: 'cover' }}
                preview={false}
              />
            }
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
              }}
              onClick={() => handleRemove(photo.uid)}
            />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default App;