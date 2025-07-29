import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  aiContainer: css`
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  imagePreview: css`
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
  `,

  promptInput: css`
    width: 100%;
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  `,

  analyzeButton: css`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 16px;
    background-color: #1677ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #d9d9d9;
      cursor: not-allowed;
    }
  `,

  responseBox: css`
    margin-top: 2rem;
    white-space: pre-wrap;
    background: gray;
    padding: 1rem;
    border-radius: 8px;
  `,
});
