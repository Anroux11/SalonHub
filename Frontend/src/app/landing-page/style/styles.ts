import { createStyles,css } from 'antd-style';

export const useStyles = createStyles ({
  page: css`
    height: 100vh;
    background: linear-gradient(135deg, #2a2b2eff 0%, #111218ff 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    position: relative;
    box-sizing: border-box;
    
    /* Animated background pattern */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(44, 44, 53, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(59, 57, 57, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(55, 55, 56, 0.2) 0%, transparent 50%);
      animation: float 6s ease-in-out infinite;
      pointer-events: none;
    }
    
    /* Subtle floating animation */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
    }
    
    /* Ensure no body scroll */
    body {
      margin: 0;
      overflow: hidden;
    }
  `,

  logo: css`
    position: relative;
    margin-bottom: 1rem;
    animation: logoEntrance 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3));
    flex-shrink: 0;
    
    img {
      border-radius: 25px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: 100%;
      height: auto;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        transform: scale(1.05) rotate(2deg);
        filter: brightness(1.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      }
    }
    
    @keyframes logoEntrance {
      0% {
        opacity: 0;
        transform: translateY(50px) scale(0.8) rotate(-10deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0deg);
      }
    }
    
    /* Responsive logo sizes */
    @media (min-width: 1200px) {
      img {
        width: 300px !important;
        height: 300px !important;
      }
    }
    
    @media (max-width: 768px) {
      img {
        width: 230px !important;
        height: 230px !important;
      }
      margin-bottom: 0.8rem;
    }
    
    @media (max-width: 480px) {
      img {
        width: 200px !important;
        height: 200px !important;
      }
      margin-bottom: 0.6rem;
    }
  `,

  heading: css`
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800;
    color: transparent;
    text-align: center;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%);
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: titleSlide 1s ease-out 0.3s both;
    flex-shrink: 0;
    letter-spacing: -0.02em;
    line-height: 1.1;
    
    /* Glowing effect */
    position: relative;
    
    &::after {
      content: 'Welcome to SalonHub';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: blur(3px);
      z-index: -1;
      opacity: 0.5;
    }
    
    @keyframes titleSlide {
      0% {
        opacity: 0;
        transform: translateX(-50px);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
        filter: blur(0);
      }
    }
    
    @media (max-width: 768px) {
      margin-bottom: 0.4rem;
    }
  `,

  sinceText: css`
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    color: rgba(179, 172, 172, 0.95);
    margin-bottom: 1.8rem;
    text-align: center;
    font-weight: 400;
    letter-spacing: 0.5px;
    animation: fadeInUp 1s ease-out 0.6s both;
    flex-shrink: 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 768px) {
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 480px) {
      margin-bottom: 1.2rem;
    }
  `,

  orangeButton: css`
    background: linear-gradient(135deg, #FF9323 0%, #FF9323 100%) !important;
    border: none !important;
    height: 56px;
    padding: 0 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 28px;
    box-shadow: 
      0 8px 30px rgba(238, 90, 36, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    animation: buttonBounce 1s ease-out 0.9s both;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    
    /* Shimmer effect */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
    
    &:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 
        0 15px 40px rgba(238, 90, 36, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
      background: linear-gradient(135deg,  #FF9323 0%,  #FF9323 100%) !important;
    }
    
    &:active {
      transform: translateY(-2px) scale(1.02);
    }
    
    .anticon {
      margin-left: 10px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:hover .anticon {
      transform: translateX(6px);
    }
    
    @keyframes buttonBounce {
      0% {
        opacity: 0;
        transform: translateY(50px) scale(0.8);
      }
      80% {
        transform: translateY(-10px) scale(1.05);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @media (max-width: 768px) {
      height: 52px;
      font-size: 1rem;
      margin-bottom: 1.2rem;
    }
    
    @media (max-width: 480px) {
      width: 100%;
      max-width: 320px;
      height: 50px;
      margin-bottom: 1rem;
    }
  `,

  smallText: css`
    color: rgba(255, 255, 255, 0.85);
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 300;
    animation: textGlow 1.2s ease-out 1.2s both;
    flex-shrink: 0;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    
    @keyframes textGlow {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @media (max-width: 768px) {
      margin-bottom: 0.8rem;
    }
  `,

  button: css`
    background: rgba(255, 255, 255, 0.1) !important;
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    color: #ffffff !important;
    height: 52px;
    padding: 0 2.2rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 26px;
    backdrop-filter: blur(15px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    animation: buttonSlide 1s ease-out 1.5s both;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
      );
      border-radius: inherit;
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    
    &:hover::before {
      opacity: 1;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.6) !important;
      color: #ffffff !important;
      transform: translateY(-3px);
      box-shadow: 
        0 12px 40px rgba(255, 255, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    &:active {
      transform: translateY(-1px);
    }
    
    .anticon {
      margin-left: 10px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:hover .anticon {
      transform: translateX(6px);
    }
    
    @keyframes buttonSlide {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @media (max-width: 768px) {
      height: 48px;
      font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
      width: 100%;
      max-width: 320px;
      height: 46px;
    }
  `,
});