import React, { FC } from 'react'

interface ButtonProps 
{

  filterClick: (event : React.MouseEvent<HTMLElement>) => void
  filterType: string
  text: string
  bkgColor: string
}

const Buttons : FC<ButtonProps>= ({filterClick, filterType, text, bkgColor}) => {
  return <button className="filter-btn" style={{backgroundColor: bkgColor}} onClick={filterClick} name={filterType} value={filterType}>{text}</button>
}

export default Buttons