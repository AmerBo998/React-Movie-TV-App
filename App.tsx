import { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import DataCard from './Components/DataCard';
import Button from "./Components/Buttons"
import MediaDetails from './Pages/MediaDetails';


const App: React.FC = (): JSX.Element =>  {

interface movieDataInterface {

  title: string; 
  backdrop_path: string; 
  id: string;
  overview:string
  video: string
  }

  interface tvDataInterface{

    name: string; 
    backdrop_path: string; 
    id: string;
    overview: string
    video: string
  }

  interface SelectedMedia{

      name: string | undefined
      image: string | undefined
      overview: string | undefined
      video: string | undefined
  }

 
  const [filter, setFilter] = useState<string>("tv")
  const [movieData,setMovieData] = useState<movieDataInterface[]>([])
  const [tvData,setTvData] = useState<tvDataInterface[]>([])
  const [selectedData, setSelectedData] = useState<SelectedMedia[]>([])
  const [searchValue, setSearchValue] = useState<string>("")



  const setDataFilter = (event : React.MouseEvent<HTMLElement>) => 
  {

    const selectedFilter = event.currentTarget as HTMLButtonElement
    const filterValue= selectedFilter.value
    setFilter(filterValue)
  }

  const seeDetails = (event : React.MouseEvent<HTMLElement>) =>
  {

   const selectedFilter = event.currentTarget as HTMLButtonElement
   const needed = [
    
    {name: selectedFilter.dataset.name,
     image: selectedFilter.dataset.image,
     overview: selectedFilter.dataset.overview,
     video: selectedFilter.dataset.video
    }
                  ]

    setSelectedData(needed)
   }
 


   const search = (e : React.ChangeEvent<HTMLElement>) => {

      const searchVal = e.currentTarget as HTMLInputElement

      setSearchValue(searchVal.value) 
      
      

   }


   const intitialDataFetch = async (filter: string) => {

    const response = await fetch
    (`https://api.themoviedb.org/3/${filter}/popular?api_key=aa1502f20c515ed17d139f10ebb13c47&language=en-US&page=1`)
   
    const data = await response.json();
 
     const data1 = data.results.slice(0,10)
     
    
     filter === "tv" ? setTvData(data1) : setMovieData(data1)


   }


   const changeDataFetch = async (filter: string, searchValue:  string) => {

    const response = await fetch
      (`
      https://api.themoviedb.org/3/search/${filter}?api_key=aa1502f20c515ed17d139f10ebb13c47&language=en-US&query=${searchValue}&page=1&include_adult=false`)
     
      const data = await response.json();
   
       const data1 = data.results.slice(0,10)
      
      
       filter === "tv" ? setTvData(data1) : setMovieData(data1)


   }




  const fetchData = async (filter: string, searchValue: string) => {

    
    if(searchValue === '' || searchValue.length < 3){ 
          intitialDataFetch(filter)
      }
   
     else if(searchValue !== '' && searchValue.length >= 3){

      changeDataFetch(filter, searchValue)

     }
    
    }

    
    const prevVal = useRef(searchValue)

    useEffect(() => 
    {

     if(prevVal.current !== searchValue)
        setTimeout(() => fetchData(filter, searchValue),1000);

     else 
        fetchData(filter, searchValue)

     },[filter, searchValue])

  


  return (
    <Router>
      
    <div className="App">
    
    <Routes>
    <Route path='MediaDetails' 
    element={<MediaDetails 
    title={selectedData.map((d) => (d.name!))} 
    imageUrl={selectedData.map((d) => ( `https://image.tmdb.org/t/p/w500/${d.image}`))} 
    overview={selectedData.map((d) => (d.overview!))}/>}/>

    <Route path='/' element={
     <div className="all">
          <Button bkgColor={filter == "tv" ? '#eec613' : '#7a6a25'} filterClick={setDataFilter} filterType="tv" text="TV Shows"/>
          <Button bkgColor={filter == "movie" ? '#eec613' : '#7a6a25'} filterClick={setDataFilter} filterType="movie" text="Movies"/>
          <Header searchEvent={search} searchValue={searchValue}/>
        <div className='dataContainer'>
   {filter === 'movie' ? movieData.map((movieData) => (
       
   <DataCard detailsPath='MediaDetails'
      video={movieData.video} 
      overview={movieData.overview} 
      showMore={seeDetails}  
      mediaName={movieData.title} 
      imageUrl={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}/>
 
   )) : tvData.map((tvData) => (
   
    <DataCard detailsPath='/MediaDetails'
      video={tvData.video} 
      overview={tvData.overview} 
      showMore={seeDetails}
      mediaName={tvData.name} 
      imageUrl={`https://image.tmdb.org/t/p/w500/${tvData.backdrop_path}`}/>))}

        </div>
      </div>



    } />
     </Routes>

   </div>
   </Router>
  );
}

export default App;
