import React, { useState } from "react";
import { FileOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  message,
  Progress,
  Space,
  Typography,
  Upload as UploadAntd,
} from "antd";
import { cloudinaryConfig } from "../../../services/index.api";
import axios from "axios";

interface Props extends UploadProps {
  handleChange: (url: string) => void;
}

interface FileCustome extends File {
  progress: number;
}

const Upload: React.FC<Props> = ({ handleChange }) => {
  const [file, setFile] = useState<FileCustome>();

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();

    // const blob = await response.blob();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    const getFileObject = (progress: number) => {
      return {
        ...file,
        name: file.name,
        progress: progress,
      };
    };

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (e.progress) setFile(getFileObject(e.progress));
          },
        },
      );
      message.success("Upload image successful");
      return response.data.secure_url; // Đây là URL của ảnh đã được tải lên
    } catch (error) {
      console.error(error);
      message.error("Upload image failed");
    }
  };

  // Custom upload request to override antd's default behavior
  const customUpload: UploadProps["customRequest"] = async ({ file }) => {
    const result = await uploadImageToCloudinary(file as File);
    handleChange(result);
  };

  return (
    <Space direction="vertical">
      <UploadAntd customRequest={customUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </UploadAntd>
      {file && (
        <Space
          direction="vertical"
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            padding: 8,
            width: "100%",
          }}
        >
          <Space>
            <FileOutlined />
            <Typography>{file.name}</Typography>
          </Space>
          <Progress percent={file.progress * 100} />
        </Space>
      )}
    </Space>
  );
};

export default Upload;
