import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  // Page Layout
  pageContainer: css`
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
    background: #2a2a2cff;
    min-height: 100vh;
  `,

  pageHeader: css`
    text-align: center;
    margin-bottom: 32px;
    padding: 24px 0;
  `,

  pageTitle: css`
    margin-bottom: 8px !important;
    font-weight: 600;
  `,

  pageSubtitle: css`
    font-size: 16px;
    color: #666;
  `,
  salonsGrid: css`
    margin: 0 -12px;
  `,
  salonCard: css`
    border-radius: 12px;
    box-shadow: 0 2px 8px #FF9323;
    transition: all 0.3s ease;
    border: 1px solid #FF9323;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      border-color: #FF9323;
    }

    .ant-card-body {
      padding: 20px;
    }

    .ant-card-actions {
      border-top: 1px solid #f0f0f0;
      background: #2a2a2cff;
      
      li {
        margin: 8px 0;
      }
    }
  `,

  cardContent: css`
    text-align: center;
  `,

  avatarSection: css`
    margin-bottom: 16px;
  `,

  salonAvatar: css`
    background: linear-gradient(135deg, #0e2e4dff, #FF9323);
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
  `,

  salonInfo: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  salonName: css`
    margin-bottom: 8px !important;
    color: #262626;
    font-size: 18px;
    font-weight: 600;
  `,
  viewButton: css`
    border-radius: 6px;
    font-weight: 500;
    height: 36px;
    padding: 0 20px;
  `,

  // Modal Styles
  salonModal: css`
    .ant-modal-content {
      border-radius: 12px;
      overflow: hidden;
    }

    .ant-modal-header {
      background: linear-gradient(135deg, #0e2e4dff, #FF9323);
      border-bottom: #FF9323;
      padding: 20px 24px;
    }

    .ant-modal-body {
      padding: 24px;
    }

    .ant-modal-footer {
      border-top: 1px solid #FF9323;
      padding: 16px 24px;
    }
  `,

  modalHeader: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  modalAvatar: css`
    background: linear-gradient(135deg, #0e2e4dff, #FF9323);
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
  `,

  modalTitle: css`
    margin: 0 !important;
    color: #1890ff;
    font-size: 20px;
  `,
  modalContent: css`
    line-height: 1.6;
  `,
  // Responsive adjustments
  '@media (max-width: 768px)': {
    pageContainer: css`
      padding: 16px;
    `,

    salonCard: css`
      margin-bottom: 16px;
    `,

    modalHeader: css`
      flex-direction: column;
      text-align: center;
      gap: 12px;
    `,

    detailItem: css`
      flex-direction: column;
      gap: 4px;
      text-align: center;
    `,

    servicesTags: css`
      justify-content: center;
    `,
  }
});