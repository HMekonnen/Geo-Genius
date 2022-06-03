import './style.css'
import React, {useState} from 'react';
import axios from 'axios';



import {ComposableMap,
     Geographies, 
     Geography,
      Marker, 
      Annotation, 
      ZoomableGroup} from "react-simple-maps"
     
      import ReactTooltip from 'react-tooltip';
  
      // URL for a basic map - this link was provided in the package.json of react-simple-maps - > dist folder.
  const geoUrl =  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
  
  const markers = [ // Purpose: markerOffset = which direction from actual marker the name will show up marker = coordinates, then name will display at markerOffset, coordinates - will point to the country on map - Done by adding code after geographies component and mapping through markers array
    {
    markerOffset: -15,
    name: "Sau Paulo",
    coordinates: [-58.3816, -34.6037],
  },  {
    markerOffset: -15,
    name: "Melbourne",
    coordinates: [-144.963058, -37.813629],
  }, 
    {
    markerOffset: 25,
    name: "Dhaka",
    coordinates: [90.412521, 23.810337],
  }, {
    markerOffset: -15,
    name: "San Francisco",
    coordinates: [-122.419418, 37.774929],
  },]
  

 function Home() {

              
       const [content, setContent] = useState("") // Used in Geography component - to show country name upon hover - also used b/n reactToolTip
       

       const [countryData, setCountryData] = useState({
          name: "",
          capital:"",
          subregion: "",
          region: "",
          population: 0 ,
          timezones: "",
          flag: "",
          currency: "",
          languages: ""
     })




     
     const fetchData = async(ISO_A2) =>{
          console.log({content}) // = Name
          try { 
          const response =await axios.get(`https://restcountries.com/v3.1/alpha/${ISO_A2}`) 
          console.log("response:",response)
          const details = response.data[0]
          console.log("Data:", details)
   
          setCountryData({
               name: details?.name.common,
               capital:details?.capital[0],
               subregion: details?.subregion,
               region: details?.region,
               population: details?.population,
               timezones: details?.timezones?.[0],
               flag: details?.flags?.svg,
               currency: details?.currencies?.CDF?.name,
               languages: details?.languages
               
          
          }) 
     }  catch (e){console.log(e)}
    
     } 
   
     console.log(countryData)
         return (
           <div className="App">
            <h1> Geo-Genius</h1>
            <ReactTooltip> {content} </ReactTooltip>
            <div className="Map">
       
           
       {/* ComposableMap component  */}
       <ComposableMap data-tip=""> 

       <ZoomableGroup className='Zoom'> 
       {/* Make map interactive by Wrapping the map in a zoomable component - which will allow us to zoom into the map */}
       {/* Child of ComposableMap takes in prop called Georgraphy - we pass it url from where it should get georgraphy - think of this as each of the countries */}
       <Geographies geography = {geoUrl}>
       
       {({geographies})=>
        
       geographies.map((geo)=>(
         // Array of all the countries that are in the map - derived from geoUrl each country on the map will be from geography component
       <Geography
       key = {geo.rsmKey}
       geography= {geo} onClick={()=> {
         
         const {ISO_A2} = geo.properties;
          console.log(geo)
      

         fetchData(ISO_A2)
       }}
       onMouseEnter={()=>{
          const {NAME} = geo.properties;
         setContent(`${NAME}`)
       }
       } 
       style={{
         hover: {
           fill: "#F53",
           outline: "none"
         }
       }}
        />
       
       
       ))
       }
       
       
       </Geographies>
       {
         markers.map(({name,coordinates,markerOffset})=>(
       // Create Marker component- markers.map will map through markers- passed in marker properties as params - for each of the markers we create a marker component which takes in the key -- name of marker and coordinates -- coordinates of marker w/ in the marker component - we add a circle ( styled orange cirle ), then text which will display the marker {name} - and the offset is utilized using y - how far along y axis compared the the circle.
           <Marker key= {name} coordinates = {coordinates}>
             <circle r={10} fill = "#F00" stroke= "#fff" strokeWidth={2}/>
             <text textAnchor='middle' y={markerOffset} style={{fontFamily: "system-ui", fill: "#5D5A6D"}}>
               {name}
             </text>
           </Marker>
          
         ) )
       }
        {/* Give it a point of Annotation called a subject- takes array of lat & long. DX & DY => direction of the annonation - where its located. Connector props = the line you see b/n the location and the text and we have the text itself */}
        <Annotation 
        subject={[2.3522, 48.8566]} 
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "#FF5933",
          strokeWidth: 3,
          strokeLinecap: "round",
        }}>
       
          <text x="-8"
          textAnchor='end'
          alignmentBaseline='middle'
          fill='#F53'>
       
            {"Paris"}
          </text>
             
             </Annotation>
       </ZoomableGroup>
       </ComposableMap>
       </div>
       

  </div> );
 }
 
 export default Home;