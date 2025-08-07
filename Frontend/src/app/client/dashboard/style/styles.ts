import { CSSProperties } from 'react';
import { createStyles, css } from "antd-style";

export const dashboardStyles = {
  container: {
    padding: '24px',
    minHeight: '100vh',
  } as CSSProperties,

  loadingContainer: {
    height: '100vh',
    backgroundColor: '#f0f2f5',
  } as CSSProperties,

  loadingText: {
    marginTop: '16px',
    color: '#666',
    textAlign: 'center' as const,
  } as CSSProperties,

  title: {
    margin: 0,
    color: '#1890ff',
  } as CSSProperties,

  titleIcon: {
    marginRight: '12px',
  } as CSSProperties,

  buttonDescription: {
    display: 'block',
    marginTop: '8px',
    textAlign: 'center' as const,
  } as CSSProperties,
};

export const cardStyles = {
  standard: {
    height: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e8e8e8',
  } as CSSProperties,

  header: {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e8e8e8',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  } as CSSProperties,

  loadingCard: {
    textAlign: 'center' as const,
    minWidth: '200px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  } as CSSProperties,

  reportCard: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #f0f0f0',
  } as CSSProperties,
};

export const buttonStyles = {
  primary: {
    height: '60px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
    border: 'none',
    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
  } as CSSProperties,

  secondary: {
    height: '60px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    borderColor: '#1890ff',
    color: '#1890ff',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as CSSProperties,
};

export const modalStyles = {
  standard: {
    borderRadius: '12px',
  } as CSSProperties,

  large: {
    borderRadius: '12px',
  } as CSSProperties,

  content: {
    padding: '16px 0',
  } as CSSProperties,

  mapContainer: {
    height: '320px',
    border: '2px solid #e6f7ff',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    position: 'relative' as const,
  } as CSSProperties,

  uploadButton: {
    border: 0,
    background: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  } as CSSProperties,
};

// Additional utility styles for enhanced visual appeal
export const enhancedStyles = {
  gradientBackground: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  } as CSSProperties,

  shadowBox: {
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  } as CSSProperties,

  hoverEffect: {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    },
  } as CSSProperties,

  primaryGradient: {
    background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
    color: '#ffffff',
  } as CSSProperties,

  surfaceElevated: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.06)',
  } as CSSProperties,
};

export const useStyles = createStyles({
  dashboardContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 24px;
  `,
  summaryRow: css`
    width: 100%;
    margin-bottom: 24px;
  `,
  summaryCard: css`
    h3 {
      margin-bottom: 8px;
    }
    p {
      margin: 0;
    }
    .count {
      font-size: 24px;
      font-weight: bold;
    }
    background: linear-gradient(90deg, #072544ff, #FF9323);
  `,
  quickActionsRow: css`
    width: 100%;
    margin-bottom: 24px;
  `,
  quickActionButton: css`
    width: 100%;
  `,
  bookingCard: css`
    width: 100%;
  `,
  modalTitleContainer: css`
  display: flex;
  align-items: center;
  gap: 12px;
  `,
  modalTitleIcon: css`
    font-size: 20px;
    color: black;
  `,
  modalTitleText: css`
    font-size: 18px;
    font-weight: 600;
    color: black;
  `,
  modalFooterContainer: css`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  `,
  uploadContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 2px;
  `,
   uploadIcon: css`
    font-size: 18px;
    color: #f7f7f7ff;
  `,
  uploadText: css`
    color: #f4f0ecff;
    font-weight: 500;
    text-align: center;
  `,
  uploadSubText: css`
    color: #f4f0ecff;
    font-size: 12px;
    text-align: center;
  `,
  tipContainer: css`
    background: linear-gradient(135deg, #303648ff 0%, #6485e7ff 100%);
    padding: 16px;
    border-radius: 8px;
    margin-top: 20px;
  `,
  tipText: css`
    color: white;
    font-size: 14px;
    margin: 0;
  `,
  fieldIcon: css`
    color: #FF9323;
  `,
  secondaryText: css`
    font-size: 12px;
    margin-left: 8px;
  `,
  formItem: css`
    margin-bottom: 20px;
  `,
  formLabel: css`
    font-weight: 500;
    color: #686D7;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  inputField: css`
    width: 100%;
    height: 44px;
    border-radius: 8px;
    border: 2px solid #e1e8ed;
    transition: all 0.3s ease;
    background: #686D76 !important;

    &:hover {
      border-color: #FF9323;
    }

    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .ant-select-selector {
      border: none !important;
      box-shadow: none !important;
      height: 40px !important;
      
      .ant-select-selection-item {
        line-height: 36px !important;
      }
    }

    .ant-picker {
      border: none;
      height: 40px;
      width: 100%;
      
      .ant-picker-input > input {
        font-size: 14px;
      }
    }
  `,
  uploadArea: css`
    .ant-upload-select {
      background: #686D76 !important;
      border: 2px dashed #d1d9e6 !important;
      border-radius: 8px !important;
      transition: all 0.3s ease !important;

      &:hover {
        border-color: #FF9323 !important;
        background: #686D76 !important;
      }
    }
  `,
  submitButton: css`
    background: linear-gradient(135deg, #FF9323 0%, #212428 100%);
    border: none;
    border-radius: 8px;
    height: 40px;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
      background: linear-gradient(135deg, #212428 0%, #FF9323 100%) !important;
    }

    &:focus {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }
  `,
  cancelButton: css`
    border-radius: 8px;
    height: 40px;
    font-weight: 500;
    border: 2px solid #e1e8ed;
    color: #666;
    background: white;
    transition: all 0.3s ease;

    &:hover {
      border-color: #FF9323!important;
      color: #FF9323 !important;
    }
  `,
  modalContent: css`
    .ant-modal-content {
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .ant-modal-header {
      background: #FF9323!important;
      border-bottom: none;
      padding: 20px 24px;
    }
    
    .ant-modal-title {
      color: black;
      font-size: 18px;
      font-weight: 600;
    }
    
    .ant-modal-body {
      padding: 24px;
      background: #212428;
    }
    
    .ant-modal-footer {
      background: #212428;
      border-top: 1px solid #212428;
      padding: 16px 24px;
    }
  `,
});