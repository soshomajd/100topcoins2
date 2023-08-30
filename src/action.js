import axios from "axios";
import { loading,success,failed } from "./constants";


export const getdata=()=> async(dispatch,getstate)=>{
    try {
        dispatch({type:loading,payload:{data:[],loading:true,error:""}})
        const {data}= await axios("https://api.coingecko.com/api/v3/coins");
        dispatch({type:success,payload:{data:[...data],loading:false,error:""}})

    } catch (error) {
        dispatch({type:failed,payload:{data:[],loading:false,error:"error"}})
        console.log(error)
    }
    
}