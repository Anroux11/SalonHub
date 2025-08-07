import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  bookingContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 24px;
  `,
  searchInput: css`
    width: 100%;
    margin-bottom: 30px;
    max-width: 100%;
    box-sizing: border-box;
  `,
  bookingTable: css`
    width: 100%;
  `,
  modalBody: css`
    padding: 20px;

    .ant-modal-header {
      border-bottom: 1px solid #ff9323;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
  `,
  cardBody: css`
    margin-bottom: 20px;
    text-align: center;
    border: 1px solid #ff9323;

    .ant-card-body {
      padding: 10px;
    }
  `,
  image: css`
    max-width: 300px;
    border-radius: 8px;
  `,
  bookingContainerTitle: css`
    color: black;
  `,
  bookingCard: css`
    margin-bottom: 16px;

    .ant-card-head {
      background-color: #ff9323;
      border-bottom: 1px solid #ff9323;
      color: black;
    }
  `,
  shopIcon: css`
    color: #1890ff;
  `,
  userIcon: css`
    color: #52c41a;
  `,
  scissorIcon: css`
    color: #fa8c16;
  `,
  calenderIcon: css`
    color: #722ed1;
  `,
  bookingHeaders: css`
    margin-left: 20px;
    font-size: 15px;
  `,
  statusCard: css`
    background-color: #2a2a2cff;
    border: 1px solid #f0f0f0;
  `,
  tag: css`
    font-size: 14px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 6px;
  `,
});
