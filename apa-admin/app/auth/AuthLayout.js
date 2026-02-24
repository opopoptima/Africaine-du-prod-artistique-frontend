import React from 'react';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-[var(--color-secondary-900)]">
      {/* Left Panel */}
      <div className="w-[30%] bg-[var(--color-primary-300)] p-12 flex flex-col justify-between relative">
        <div className="mt-8">
          <h1 className="text-[var(--color-secondary-100)] text-[2.2rem] font-bold leading-[1.2] tracking-normal">
            Éditeur jeunesse engagé<br />
            <span className="text-[var(--color-primary-100)]">enfant</span><br />
            mérite un<br />
            monde<br />
            <span className="text-[var(--color-primary-100)]">magique</span>
          </h1>
        </div>
        {/*
        Éditeur jeunesse engagé, au service de la lecture, de la culture et de l’avenir des enfants.
         */}

        <div className="flex justify-center items-end mb-8">
          <img 
            src="/images/learningBanner/apa-logo.png" 
            alt="Logo" 
            className="w-48 h-48 object-contain"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[var(--color-primary-300)] flex items-center justify-center relative">
        <div className="bg-[var(--color-secondary-100)] w-full h-full rounded-tl-[3rem] flex items-center justify-center shadow-lg">
          <div className="w-full max-w-md px-12">
            {title && (
              <h2 className="text-[2rem] font-bold text-center mb-16 text-[var(--color-secondary-900)]">
                {title}
              </h2>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
