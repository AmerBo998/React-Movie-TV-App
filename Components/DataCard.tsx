import { FC } from "react"
import { Link } from "react-router-dom"

interface DataCardProps {

mediaName: string,
imageUrl: string,
showMore?: (event: React.MouseEvent<HTMLElement>) => void,
detailsPath: string
overview?: string
video? : string
}

const DataCard : FC<DataCardProps>= ({mediaName, imageUrl, showMore, detailsPath, overview, video}) => {
  return (
    <Link to={detailsPath} className="dataCard" onClick={showMore}  data-name={mediaName} 
    data-image={imageUrl} data-video={video} data-overview={overview}>
        <div  className="imageHolder" style={{backgroundImage : `url(${imageUrl})`}}></div>
        <h2 className="dataCard--title" style={{textAlign: "center"}}>{mediaName}</h2>

    </Link>
  )
}

export default DataCard