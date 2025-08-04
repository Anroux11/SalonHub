"use client";

import React, { useState, useEffect } from "react";
import { 
  Card, 
  Button, 
  Input, 
  Upload, 
  Typography, 
  Space, 
  Spin, 
  Row,
  Col,
  message
} from "antd/es";
import { 
  
  RobotOutlined, 
  SendOutlined,
  FileImageOutlined 
} from "@ant-design/icons";
import { GoogleGenAI } from "@google/genai";
import { useStyles } from "./style/styles";

const { Title, Text } = Typography;
const { TextArea } = Input;

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API!;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiImageAnalysis = () => {
   const { styles } = useStyles();
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleFileChange = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file only');
      return false;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      message.error('Image size must be less than 5MB');
      return false;
    }

    setImageFile(file);
    message.success('Image uploaded successfully');
    return false; // Prevent default upload behavior
  };

  const readImageAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string)?.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      message.warning('Please enter a prompt');
      return;
    }
    
    if (!imageFile) {
      message.warning('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const base64Image = await readImageAsBase64(imageFile);

      const result = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageFile.type,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      });

      setResponseText(result.text ?? "No response text received.");
      message.success('Analysis completed successfully');
    } catch (error) {
      console.error(error);
      setResponseText("Error analyzing the image.");
      message.error('Failed to analyze the image');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    message.info('Image removed');
  };

  return (
    <div className={styles.container}>
      <Card 
        title={
          <Space>
            <RobotOutlined className={styles.titleContainer} />
            <Title level={3} className={styles.mainTitle}>
              AI Image Analysis
            </Title>
          </Space>
        }
        className={styles.mainCard}
      >
        <Row gutter={[24, 24]}>
          {/* Left Column - Input Section */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" className={styles.fullWidthSpace}>
              {/* Image Upload Section */}
              <div>
                <Text strong className={styles.sectionTitle}>
                  Upload Image
                </Text>
                <Upload.Dragger
                  name="image"
                  multiple={false}
                  beforeUpload={handleFileChange}
                  showUploadList={false}
                  accept="image/*"
                >
                  <p className="ant-upload-drag-icon">
                    <FileImageOutlined className={imageFile ? styles.uploadIconSuccess : styles.uploadIcon} />
                  </p>
                  <p className="ant-upload-text">
                    {imageFile ? 'Image uploaded successfully!' : 'Click or drag image to upload'}
                  </p>
                  <p className="ant-upload-hint">
                    Support for single image upload. Max size: 5MB
                  </p>
                </Upload.Dragger>

                {imageFile && (
                  <div className={styles.fileInfo}>
                    <Space>
                      <Text type="success">
                        📁 {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                      </Text>
                      <Button 
                        type="text" 
                        danger 
                        size="small"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </Button>
                    </Space>
                  </div>
                )}
              </div>

              {/* Prompt Input Section */}
              <div>
                <Text strong className={styles.sectionTitle}>
                  Enter Your Prompt
                </Text>
                <TextArea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you'd like to know about the image..."
                  rows={4}
                  className={styles.promptTextArea}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="primary"
                size="large"
                icon={<SendOutlined />}
                onClick={handleSubmit}
                disabled={loading || !imageFile || !prompt.trim()}
                loading={loading}
                className={styles.submitBtn}
              >
                {loading ? 'Analyzing Image...' : 'Analyze Image'}
              </Button>
            </Space>
          </Col>

          {/* Right Column - Preview & Results */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large"  className={styles.fullWidthSpace}>
              {/* Image Preview */}
              {imagePreviewUrl && (
                <div>
                  <Text strong className={styles.sectionTitle}>
                    Image Preview
                  </Text>
                  <div className={styles.imagePreviewContainer}>
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className={styles.imagePreview}
                    />
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <Card className={styles.loadingCard}>
                  <Spin size="large" />
                  <div className={styles.loadingText}>
                    <Text>Analyzing your image with AI...</Text>
                  </div>
                </Card>
              )}

              {/* Analysis Results */}
              {responseText && !loading && (
                <div>
                  <Text strong className={styles.sectionTitle}>
                    AI Analysis Results
                  </Text>
                  <Card 
                    className={styles.resultsCard}
                  >
                    <Space direction="vertical" size="small">
                      <Space>
                        <RobotOutlined className={styles.resultsIcon} />
                        <Text strong className={styles.resultsIcon}>
                          Gemini Analysis:
                        </Text>
                      </Space>
                      <Text className={styles.resultsText}>
                        {responseText}
                      </Text>
                    </Space>
                  </Card>
                </div>
              )}

              {/* Placeholder when no image */}
              {!imagePreviewUrl && !loading && !responseText && (
                <Card 
                   className={styles.placeholderCard}
                >
                  <Space direction="vertical" size="middle">
                    <FileImageOutlined className={styles.placeholderIcon} />
                    <div>
                      <Text type="secondary">Upload an image and enter a prompt</Text>
                      <br />
                      <Text type="secondary">to get started with AI analysis</Text>
                    </div>
                  </Space>
                </Card>
              )}
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default GeminiImageAnalysis;