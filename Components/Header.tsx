import { FC } from "react"
import Button from "./Buttons"

interface HeaderProps{

searchEvent: (e :  React.ChangeEvent<HTMLElement>) => void
searchValue: string
}

const Header : FC <HeaderProps> = ({searchEvent, searchValue}) => {
    
  return (
     <div className="header-frame">
      <input className="search-bar" value={searchValue}type="text" placeholder="&#x1F50D; search..." onChange={searchEvent}/>
     <br></br></div>


  )
}

export default Header