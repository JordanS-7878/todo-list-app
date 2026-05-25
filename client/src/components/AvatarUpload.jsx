import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { message, Upload, Image, Avatar } from "antd";
import { useState } from "react";

export default function AvatarUpload({
  image,
  setImage,
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

      const imageUrl = info.file.response?.user?.image;

      setImage?.(imageUrl);
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
        cursor: "pointer",
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
        listType="picture-circle" // ~104px × 104px
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        disabled={disabled}
        maxCount={1}
      >
        {image ? (
          // <Image
          //   src={`http://localhost:5050${image}`}
          //   alt="avatar"
          //   preview={false}
          //   draggable={false}
          //   width="100%"
          //   height="100%"
          //   style={{
          //     objectFit: "cover",
          //     borderRadius: "50%",
          //   }}
          // />
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar
              size={104}
              src={image ? `http://localhost:5050${image}` : null}
            />

            {image && (
              <button
                onClick={(e) => {
                  setImage?.("");
                  e.stopPropagation();
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  border: "none",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </button>
            )}
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
}
