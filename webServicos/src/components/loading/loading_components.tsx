import React from 'react';
import { LoadingComponentsProps } from '../../interface';

const LoadingComponents: React.FC<LoadingComponentsProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
      <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="text-light mt-3 fs-5">Carregando...</p>
    </div>
  );
};

export default LoadingComponents;