import { useEffect, useState } from "react";
import { Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ImageUpload({ value, onChange }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // convert backend value -> Upload file format
  const fileList = value
    ? [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `http://localhost:5050${value}`,
        },
      ]
    : [];

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => {
    const file = fileList[0];

    if (!file) {
      onChange?.(null);
      return;
    }

    // ONLY return raw file to parent (for FormData upload)
    onChange?.(file.originFileObj);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed");
      return Upload.LIST_IGNORE;
    }

    const isUnder5MB = file.size / 1024 / 1024 < 5;
    if (!isUnder5MB) {
      message.error("Image must be smaller than 5MB");
      return Upload.LIST_IGNORE;
    }

    return false; // prevent auto upload
  };

  return (
    <div>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        maxCount={1}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>

      {previewImage && (
        <Image
          src={previewImage}
          preview={{
            open: previewOpen,
            onOpenChange: (v) => setPreviewOpen(v),
            afterOpenChange: (v) => !v && setPreviewImage(""),
          }}
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}
