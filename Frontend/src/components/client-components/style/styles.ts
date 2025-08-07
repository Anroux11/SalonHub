import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css }) => ({
  drawer: css`
    .ant-drawer-content {
      background: #686d76;
    }
  `,
  drawerContent: css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  header: css`
    background: linear-gradient(135deg, #ff9323 0%, #686d76 100%);
    padding: 32px 24px;
    color: white;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `,
  avatarSection: css`
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
  `,
  avatar: css`
    background: rgba(255, 255, 255, 0.2);
    border: 3px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-weight: 600;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
  `,
  userInfo: css`
    flex: 1;
  `,
  userName: css`
    color: white !important;
    margin: 0 !important;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  userEmail: css`
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  `,
  formSection: css`
    flex: 1;
    padding: 32px 24px;
    background: transparent !important;
    margin: 0;
  `,
  sectionHeader: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #ff9323;
  `,
  sectionIcon: css`
    color: ${token.colorPrimary};
    font-size: 18px;
  `,
  sectionTitle: css`
    margin: 0 !important;
    color: ${token.colorText};
    font-weight: 600;
  `,
  form: css`
    .ant-form-item-label > label {
      font-weight: 600;
      color: ${token.colorText};
    }
  `,
  input: css`
    border-radius: 8px;
    border: 2px solid #f0f0f0;
    padding: 12px 16px;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }

    &:focus {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.1);
    }
  `,
  inputIcon: css`
    color: #bfbfbf;
  `,
  nameRow: css`
    display: flex;
    gap: 16px;
    width: 100%;

    .ant-space-item {
      flex: 1;
    }
  `,
  nameField: css`
    flex: 1;
    margin-bottom: 24px;
  `,
  updateButton: css`
    height: 48px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    background: linear-gradient(
      135deg,
      ${token.colorPrimary} 0%,
      #457badff 100%
    );
    border: none;
    box-shadow: 0 4px 16px rgba(24, 144, 255, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(24, 144, 255, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  `,
  deleteSection: css`
    background: #686d76;
  `,
  divider: css`
    margin: 0;

    &::before,
    &::after {
      border-top-color: #ff7875;
    }
  `,
  dividerText: css`
    color: #fa9798ff;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,
  dangerZone: css`
    padding: 24px;
  `,
  dangerInfo: css`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  `,
  dangerIcon: css`
    color: #fa9798ff;
    font-size: 20px;
    margin-top: 2px;
  `,
  dangerTitle: css`
    color: #fa9798ff;
    font-size: 16px;
  `,
  dangerDescription: css`
    color: white;
    font-size: 13px;
    line-height: 1.5;
    margin-top: 4px;
  `,
  deleteButton: css`
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    border: 2px solid #fa9798ff !important;
    color: #fa9798ff !important;
    transition: all 0.3s ease;

    &:hover {
      background: #ff4d4f !important;
      color: white !important;
      border-color: #ff4d4f !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
    }
  `,
  deleteModal: css`
    .ant-modal-header {
      border-bottom: 2px solid #ff7875;
    }

    .ant-modal-title {
      color: #ff4d4f;
      font-weight: 600;
    }
  `,
  modalContent: css`
    padding: 10px 0;
  `,
  modalText: css`
    color: ${token.colorText};
    font-size: 15px;
    line-height: 1.6;
  `,
}));
