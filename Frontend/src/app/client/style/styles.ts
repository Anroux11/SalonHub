import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    layout: css`
    min-height: 100vh;
  `,
  sider: css`
    position: relative;
  `,
  imageContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11.5px;
    border-bottom: 1px solid orange;
  `,
  image: css`
    transition: all 0.3s ease;
  `,
  toggleButton: css`
    position: fixed;
    top: 10px;
    z-index: 1001;
    transition: all 0.3s ease;
    border: 1px solid #FF9323;
    border-radius: 6px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FF9323;
    background-color: #212428

    &:hover {
      border-color: colorPrimary;
      color: colorPrimary
    }
  `,
  headerTitle: css`
    background: colorBgContainer;
    padding: 0 24px;
    border-bottom: 1px solid #FF9323;
    display: flex;
     align-items: center;
     justify-content: center;
     position: relative;

    @media (max-width: 768px) {
      padding: 0 16px;
    }
    
    @media (max-width: 480px) {
      padding: 0 12px;
    }
  `,

  title: css`
    margin: 0;
    color: colorText;
    font-weight: 600;
    font-size: 24px;
    line-height: 1.2;
    transition: font-size 0.3s ease;

    @media (min-width: 1200px) {
    font-size: 28px !important; 
    }
    
    @media (max-width: 1199px) and (min-width: 769px) {
    font-size: 24px !important; 
    }
    
    @media (max-width: 768px) and (min-width: 481px) {
    font-size: 17px !important;
    }
    
    @media (max-width: 480px) {
    font-size: 13px !important;
    font-weight: 500 !important;
    }
    
    @media (max-width: 360px) {
    font-size: 10px !important;
    font-weight: 500 !important;
    }
  `,

  titleText: css`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    @media (max-width: 480px) {
      max-width: calc(100vw - 120px);
    }
    
    @media (max-width: 360px) {
      max-width: calc(100vw - 100px);
    }
  `,

  contentContainer: css`
    margin: 24px;
    padding: 24px;
    min-height: 280px;
    background: colorBgContainer;
    border-radius: borderRadius px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `,
  logoutSection: css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  `,
  logoutSectionCollapsed: css`
    padding: 12px 8px;
  `,
  logoutSectionExpanded: css`
    padding: 16px 12px;
  `,
  userInfoSection: css`
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  `,
  userInfoSpace: css`
    width: 100%;
  `,
  userIcon: css`
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  `,
  userText: css`
    color: rgba(255, 255, 255, 0.85);
    font-size: 12px;
    font-weight: 500;
    flex: 1;
    min-width: 0; // Allow text to truncate
  `,
  logoutButton: css`
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s ease;
    background: transparent;

    &:hover {
      background-color: rgba(255, 77, 79, 0.2) !important;
      border-color: #ff4d4f !important;
      color: #ff7875 !important;
    }

    &:focus {
      background-color: rgba(255, 77, 79, 0.2) !important;
      border-color: #ff4d4f !important;
      color: #ff7875 !important;
    }
  `,
  logoutButtonCollapsed: css`
    height: 40px;
    justify-content: center;

    .anticon {
      font-size: 16px;
    }
  `,
  logoutButtonIcon: css`
    font-size: 14px;
  `,
  modalHeader: css`
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  `,
  modalHeaderIcon: css`
    color: #faad14;
  `,
  modalBody: css`
    padding: 20px;
    font-size: 15px;
  `,
  modalContent: css`
    padding: 10px 0;
  `,
  modalText: css`
    font-size: 15px;
    line-height: 1.5;
  `,
  modalUserInfo: css`
    margin-top: 16px;
    padding: 12px;
    background-color: #5a5757ff;
    border-radius: 6px;
    border: 1px solid #f0f0f0;
  `,

  modalUserIcon: css`
    color: #1890ff;
  `,
  modalCancelButton: css`
    min-width: 80px;
  `,
  modalLogoutButton: css`
    min-width: 120px;
  `,
})