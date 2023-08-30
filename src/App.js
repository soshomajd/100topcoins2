
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getdata } from './action';
import './App.css';
import React from 'react';
import { Spinner } from 'react-bootstrap';



function App() {
  const dispatch=useDispatch();
  const [select,setselect]=useState("")
  const{data,loading,error}=useSelector((state)=>state.coins)
  const search=useSelector((state)=>state.search)
 


  useEffect(() => {
   dispatch(getdata()); 
  }, [])

  const pstyle = useRef();
  console.log(pstyle?.current?.style?.color)
  
  
  return (
    <div className="App">
      <button onClick={()=>pstyle.current.style.color="green"}></button>
      {loading ? (<Spinner animation='grow' variant='danger'></Spinner>) : error ? (<p>{error}</p>):(
      <div>
           <div className='mt-3'>
            <input onChange={(e)=>dispatch({type:"search",payload:e.target.value})} type={"text"} />
            <select onChange={(e)=>setselect(e.target.value)}>
              <option>A-Z</option>
              <option>Z-A</option>
              <option>Hprice</option>
              <option>Lprice</option>
              <option>market_cap</option>
            </select>
           </div>

        <div style={{width:"80% ",display:"grid",gridTemplateColumns:"repeat(5,200px)",
      justifyContent:"center",alignItems:"center",justifyItems:"center"
      ,borderBottom:"2px solid black",
      paddingBottom:"10px",paddingTop:"10px", margin:"0 auto",fontSize:"32px",color:"#dc3545",fontFamily:"cursive"
      }}>
          <p ref={pstyle} style={{color:"blue"}}>Image</p>
          <p>Name</p>
          <p>Symbol</p>
          <p>Marketcap</p>
          <p>Price</p>
        </div>
      {data.sort((x,y)=>{
        switch (select) {
          case "market_cap":
            return y.market_data.market_cap.usd-x.market_data.market_cap.usd
            
          case "Hprice":
            return y.market_data.current_price.usd-x.market_data.current_price.usd
            
          case "Lprice":
            return x.market_data.current_price.usd-y.market_data.current_price.usd
          case "Z-A":
            return y.name.localeCompare(x.name)
            
          case "A-Z":
            return  x.name.localeCompare(y.name)
            default:
              return  y.market_data.market_cap.usd-x.market_data.market_cap.usd
   
        }
      }).
      
      filter((item,index)=>{
        if(!search){
          return true

        }else if(item.name.toLowerCase().includes(search.trim().toLowerCase())|| item.symbol.toLowerCase().includes(search.trim().toLowerCase())){
            return true
        }
      }).map((item,index)=> {
     return <div key={item.id} style={{width:"80% ",display:"grid",gridTemplateColumns:"repeat(5,200px)",
      justifyContent:"center",alignItems:"center",justifyItems:"center"
      ,borderBottom:"2px solid black",
      paddingBottom:"10px",paddingTop:"10px", margin:"0 auto",fontSize:"20px",fontFamily:"cursive",color:"#6610f2"
      }}>
            <img src={item.image.small}/>
            <p>{item.name}</p>
            <p>{item.symbol}</p>
            <p>{item.market_data.market_cap.usd}</p>
            <p>{item.market_data.current_price.usd}</p>


         
        </div>

      }) }
      
      </div>
      
      )}
      

    </div>
  );
}

export default App;
