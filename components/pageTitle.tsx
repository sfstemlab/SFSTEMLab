import React from 'react'

interface PageTitleProps {
    title:string;
}

const PageTitle = ({title}:PageTitleProps) => {
  return (
      <div className="absolute top-24 md:inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-4 border-[3px] border-redBrand py-2 px-4 backdrop-blur-sm bg-brand/40 rounded-sm">
              {title}
          </h1>
      </div>
  );
}

export default PageTitle