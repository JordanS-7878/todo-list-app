import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";

export default function AvatarUpload({
  value,
  onChange,
  action,
  name = "image",
  size = 2,
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("token");

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      messageApi.error("Only image files are allowed");
      return Upload.LIST_IGNORE;
    }

    const isLtSize = file.size / 1024 / 1024 < size;

    if (!isLtSize) {
      messageApi.error(`Image must be smaller than ${size}MB`);
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      setLoading(false);

      // backend response
      const imageUrl = info.file.response?.user?.image;

      onChange?.(imageUrl);
    }

    if (info.file.status === "error") {
      setLoading(false);
      messageApi.error("Upload failed");
    }
  };

  const uploadButton = (
    <button
      type="button"
      style={{
        border: 0,
        background: "none",
      }}
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      {contextHolder}

      <Upload
        name={name}
        action={action}
        method="PUT"
        headers={{
          Authorization: `Bearer ${token}`,
        }}
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        disabled={disabled}
        maxCount={1}
      >
        {value ? (
          <img
            src={`http://localhost:5050${value}`}
            alt="avatar"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
}
