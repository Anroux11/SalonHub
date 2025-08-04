import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  container: css`
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  `,
  titleContainer: css`
    color: #1890ff;
  `,
  mainTitle: css`
    margin: 0;
  `,
  mainCard: css`
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,
  fullWidthSpace: css`
    width: 100%;
  `,
  sectionTitle: css`
    font-size: 16px;
    margin-bottom: 8px;
    display: block;
  `,
  uploadIconSuccess: css`
    font-size: 48px;
    color: #52c41a;
  `,
  uploadIcon: css`
    font-size: 48px;
    color: #1890ff;
  `,
  fileInfo: css`
    margin-top: 12px;
    text-align: center;
  `,
  promptTextArea: css`
    border-radius: 8px;
    font-size: 14px;
  `,
  submitBtn: css`
    width: 100%;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
  `,
  imagePreviewContainer: css`
    text-align: center;
    padding: 16px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fafafa;
  `,
  imagePreview: css`
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  loadingCard: css`
    text-align: center;
    border-radius: 8px;
  `,
  loadingText: css`
    margin-top: 16px;
  `,
  resultsCard: css`
    border-radius: 8px;
    background: #71726fff;
    border: 1px solid #b7eb8f;
  `,
  resultsIcon: css`
    color: #52c41a;
  `,
  resultsText: css`
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
  `,
  placeholderIcon: css`
    font-size: 48px;
    color: #d9d9d9;
  `,
  placeholderCard: css`
    text-align: center;
    border-radius: 8px;
    background: #71726fff !important;
    border: 2px dashed #d9d9d9 !important;
    padding: 24px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
});
