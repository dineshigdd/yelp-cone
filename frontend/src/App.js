import './App.scss';
import { SearchBar , Filters , Map , SearchResult } from './views'
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState  } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getBusinsessInfo , getReviews } from './actions/bussiness';
// import {  getReviews } from './actions/review';



function App() {

 const [state, setstate] = useState(null);

 const [ mobileView, setMobileView ] = useState(null); 
 const [btnState, setBtnstate] = useState(true);
 const businesses =  useSelector( ({ state }) => state.businesses ); 
 
 const location = 'Los Angeles, CA';
 const term  = '';
 
 // dispatching redux actions 
 const dispatch = useDispatch();
//  let businessId = [];

 
//  businesses.map( business => businessId.push( business.id ));
//  businessId.map( id => dispatch( getReviews( id )));




useEffect(()=>{  
  dispatch( getBusinsessInfo({ term, location }));
  
},[dispatch ]);

businesses.map( business => dispatch( getReviews( business.id )));

//  const [ filterbtnState, setFilterBtnstate] = useState(false);
 

 const [ logoMenuState , setLogoMenuState ] = useState(<>
  <img className='yelp-logo' alt="yelp-logo"/>          
  <MenuIcon className="mobile-menu-icon"/>
 </>);

 const [ isfilterListMapButtonState, setIsFilterListMapButtonState ] = useState(true);
 const [ filterBar, setFilterBar ] = useState( true );
 
 window.addEventListener('load', WindowLoadandResizeActions , true);
 window.addEventListener('resize', WindowLoadandResizeActions , true);

 function WindowLoadandResizeActions (event) {  
  if( document.body.clientWidth < 800 ){

    setFilterBar( false );  
    setMobileView(true);
    

  }else{

    setFilterBar( true );
    setMobileView( false );
  }
}


 const FilterListMapBar = ({ isfilter })=>(          
         
            <div className="mobile-filter-list-map-links">
                          <div>
                            <button className="action-buttons" id="filter-button" onClick={ 
                              ()=> { setFilterBar(!filterBar); displaySections('filters')}}>{ !isfilter ? 'Filters':"Cancel" }</button>
                          </div>
                              <div>
                                  { (btnState) ? 
                                  <>
                                    <button className="action-buttons"  id="list-button" onClick={ ()=>displaySections('list') }>List</button> 
                                    <button className="action-buttons"  id="map-button" onClick={ ()=>displaySections('map') }>Map</button>
                                </>:
                                <><button className="action-buttons"  id="search-button" onClick={ ()=>displaySections("search") }>Search</button></>
                                 }       
                                    
                              </div>
              </div> 
              );
            
//  const [ filterListMapButtonState, setFilterListMapButtonState ] = useState( <FilterListMapBar/> );
 
 
 useEffect(()=> {  
  if( !isfilterListMapButtonState ){
    setFilterBar( false );
    setstate(null);   
  }},[isfilterListMapButtonState]);

  
//  useEffect(()=> {  
//       if( isfilterListMapButtonState ){
//         // setFilterListMapButtonState(<FilterListMapBar isfilter={ filterBar }/>);     
        
//     }else{      
//         // setFilterListMapButtonState(null) ;
//         setFilterBar( false );
//         setstate(null);
//     } 
// },[isfilterListMapButtonState]);
 


  
 useEffect(()=> {  
  
      if( !filterBar ){     
        setstate(null);  
        setstate(
          <div className="App-sidebar-right">
            <h2 className="search-result-heading">{ `The 10 Best Places near ${ location }`}</h2>
            <h3 className="search-result-heading">All Results</h3>  
          <SearchResult /> 
        </div>)          
    }else{      
      setstate(<div className="App-sidebar-left"><Filters/></div>);   
    } 
},[filterBar]);



 



 const displaySections = ( component )=>{
   switch(component){
        case 'filters':   

        // if( filterBar ){        
        //   document.getElementById('filter-button').textContent = 'Filters';
        //   // setstate(<div className="App-sidebar-left"><Filters/></div>)
        // }
        // else{          
         
        //   document.getElementById('filter-button').textContent = 'Cancel'; 
        //   // setFilterBar( true);
        // }  
       
      
     break;

     case 'map':
     
      setstate( <section className="App-search-result-section"><Map /></section>);     
      // setBtnstate( false )
     break;

    case 'list':
       //display list of search result     
   
       
       setstate(
        <div className="App-sidebar-right">
        <h2 className="search-result-heading">{ `The 10 Best Places near ${ location }`}</h2>
        <h3 className="search-result-heading">All Results</h3>  
          <SearchResult /> 
      </div>   
       )
    
      break;
    

   }
    } 
 
  
    
  return (
    <div className="App">
      <header className='App-header'>         
            <div className="App-logo-and-menu-container">           
                { logoMenuState }                                                 
            </div>
     
            <div className="App-search-bar-container">
                <SearchBar 
                  LogoMenuState={ setLogoMenuState } 
                  IsFilterListMapButtonState = { setIsFilterListMapButtonState }
                  displaySections = { displaySections }   
                  />
                
            </div>      
        
            <div className="App-header-right-corner">
              <div>
                <span><a href="#">For Business</a></span>
                <span><a href="#">Write a review</a></span>
              </div>
              <div>
                <span className="App-auth-link App-login-link"><a>Log in</a></span>
                <span className="App-auth-link App-signup-link"><a>Sign up</a></span>
              </div>
            </div>
    </header>

      <main className="App-main-section">        
        { isfilterListMapButtonState ? <FilterListMapBar isfilter={ filterBar }/>:null }
      {/* { filterListMapButtonState }  */}       
       
       {  state }           
       { !mobileView ?
           <> 
                <div className="App-sidebar-right">
                  <h2 className="search-result-heading">{ `The 10 Best Places near ${ location }`}</h2>
                  <h3 className="search-result-heading">All Results</h3>  
                    <SearchResult /> 
               </div>   
                <div className="App-sidebar-right">            
                  <div><Map /></div>
               </div> 
            </>
            :
            <></>
       }
      </main>      
    </div>
  );
}



export default App;


