import { FC } from "react"
import { Link, Route } from "react-router-dom"


interface Props{

  imageUrl: string[] | undefined
  title: string[] | undefined
  overview: string[] | undefined
}

const MediaDetails:  FC<Props> = ({imageUrl, title, overview}) => {
  return (
    <div>
        <br></br>
        <Link to='/' className="back-btn">&#8592;	Go Back</Link><br></br>
        <div className="image" style={{backgroundImage: `url(${imageUrl})`}}></div>
        <br></br>
       
        <h1 className="details-title">{title}</h1>
        <p className="media_overview">{overview}</p>


    </div>
  )
}

export default MediaDetails