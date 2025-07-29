import { CSSProperties } from 'react';

export const dashboardStyles = {
  container: {
    padding: '24px',
    backgroundColor: '#f0f2f5',
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