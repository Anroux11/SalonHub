import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  employeeTechnicianContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 24px;
  `,
  employeeTechnicianTable: css`
    width: 100%;
  `,
  addButton: css`
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
  `,
  modalHeader: css`
    text-align: center;
    border-bottom: 1px solid #ff9323;
    padding-bottom: 16px;
    margin-bottom: 24px;
  `,
  modalHeaderIcon: css`
    font-size: 24px;
    color: #1890ff;
    margin-right: 8px;
  `,
  modalHeaderTitle: css`
    margin: 0;
    display: inline-block;
    color: #a0a0a0ff;
  `,
  modalHeaderSubtitle: css`
    display: block;
    margin-top: 4px;
    font-size: 14px;
  `,
  modal: css`
    .ant-modal-body {
      padding: 20px;
      background: #212428;
      border-radius: 8px;
    }
    .ant-modal-headerBackground {
      border-bottom: none;
      border-radius: 8px;
    }
  `,
  formCard: css`
    background: #212428;
    border-radius: 8px;
  `,
  formContainer: css`
    padding: 8px 0;
  `,
  fieldLabel: css`
    font-size: 14px;
  `,
  fieldIcon: css`
    margin-right: 6px;
    color: #ff9323;
  `,
  inputField: css`
    border-radius: 6px;
  `,
  modalFooter: css`
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid #ff9323;
    background: transparent;
  `,
  cancelButton: css`
    min-width: 100px;
    border-radius: 6px;
  `,
  submitButton: css`
    min-width: 100px;
    border-radius: 6px;
    background: linear-gradient(135deg, #212428 0%, #ff9323 100%);
    border: none;
  `,
  formDivider: css`
    margin: 20px 0 8px 0;
  `,
  footerText: css`
    font-size: 12px;
    font-style: italic;
  `,
});
