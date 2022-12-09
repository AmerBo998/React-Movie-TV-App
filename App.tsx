import { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import DataCard from './Components/DataCard';
import Button from "./Components/Buttons"
import MediaDetails from './Pages/MediaDetails';


const App: React.FC = (): JSX.Element =>  {

//Interface for movieData state 

interface movieDataInterface {

  title: string; 
  backdrop_path: string; 
  id: string;
  overview:string
  video: string
  }

  //Interface for tvData state 
  //Tv shows and movies needed separate states because TMDB returns different data for shows and movies

  interface tvDataInterface{

    name: string; 
    backdrop_path: string; 
    id: string;
    overview: string
    video: string
  }

  //Interface for selected Tv/Movie that helps with carrying data to antoher page via props

  interface SelectedMedia{

      name: string | undefined
      image: string | undefined
      overview: string | undefined
      video: string | undefined
  }

 
  const [filter, setFilter] = useState<string>("tv") //creating filter state and setting initial filter
  const [movieData,setMovieData] = useState<movieDataInterface[]>([]) //state that holds info about movies
  const [tvData,setTvData] = useState<tvDataInterface[]>([]) //state that holds info about TV shows
  const [selectedData, setSelectedData] = useState<SelectedMedia[]>([]) //state that holds info selected Tv/movie thats gonna be represented in details view
  const [searchValue, setSearchValue] = useState<string>("") // saving search value from search bar


  //Function that sets selected filter, either TV or Movie

  const setDataFilter = (event : React.MouseEvent<HTMLElement>) => 
  {

    const selectedFilter = event.currentTarget as HTMLButtonElement
    const filterValue= selectedFilter.value
    setFilter(filterValue)
  }


  //Function that gets info about TV/movie that was clicked as HTML datasets
  //and then updates state of slectedData, so it can be acceses and passed as prop
  //in <MediaDetails />  component

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
 

   //Function that updates searchValue state whenever input in search box is changed

   const search = (e : React.ChangeEvent<HTMLElement>) => {

      const searchVal = e.currentTarget as HTMLInputElement

      setSearchValue(searchVal.value) 
    
   }

   //Function that gets TMDB data for 10 most popular TV/Movies 
   //when page first renders and also on every  filter change

   const intitialDataFetch = async (filter: string) => {

    const response = await fetch
    (`https://api.themoviedb.org/3/${filter}/popular?api_key=aa1502f20c515ed17d139f10ebb13c47&language=en-US&page=1`)
   
    const data = await response.json();
 
     const data1 = data.results.slice(0,10)
     
    
     filter === "tv" ? setTvData(data1) : setMovieData(data1)


   }

   //Function that gets TMDB data when input in search box is changed
   //according to keyword form search bar and to the selected filter

   const changeDataFetch = async (filter: string, searchValue:  string) => {

    const response = await fetch
      (`
      https://api.themoviedb.org/3/search/${filter}?api_key=aa1502f20c515ed17d139f10ebb13c47&language=en-US&query=${searchValue}&page=1&include_adult=false`)
     
      const data = await response.json();
   
       const data1 = data.results.slice(0,10)
      
      
       filter === "tv" ? setTvData(data1) : setMovieData(data1)


   }


//Funcntion that is called inside useEffect and that determines 
//if page should be updated only by filter, by searchValue , or both

  const fetchData = async (filter: string, searchValue: string) => {

    
    if(searchValue === '' || searchValue.length < 3){ 
          intitialDataFetch(filter)
      }
   
     else if(searchValue !== '' && searchValue.length >= 3){

      changeDataFetch(filter, searchValue)

     }
    
    }

    //useRef gets previous value
    const prevVal = useRef(searchValue)

    useEffect(() => 
    {

      //if previous value isn't same as present value
      //it means searchValue has changed, and search should be performed with 1 second delay
     
      if(prevVal.current !== searchValue)
        setTimeout(() => fetchData(filter, searchValue),1000);
      
        //if searchValue has not changed, there is no delay
     else 
        fetchData(filter, searchValue)

     },[filter, searchValue])

  


  return (
    <Router>
      
    <div className="App">
    
    <Routes>

    //path to details view

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
