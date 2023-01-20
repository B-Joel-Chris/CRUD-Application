import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Viewitem.scss'

const ViewItem = () => {

    const [data,setData] = useState<any>();
    const id = useParams()

    const getData = async() =>{
        try{
            const res:any = await axios.get(`http://localhost:5000/data/${id.id}`)
            setData(res.data)
        }catch(err){console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    },[data])

    useEffect(()=>{
        getData();
    },[])

  return (
    <div>
        {data&&
        <div className='viewcontainer'>
            <div className='viewcontainer--field'>Name: <div>{data.name}</div></div>
            <div className='viewcontainer--field'>Roll Number: <div>{data.rollnumber}</div></div>
            <div className='viewcontainer--field'>English: <div>{data.english}</div></div>
            <div className='viewcontainer--field'>Telugu: <div>{data.telugu}</div></div>
            <div className='viewcontainer--field'>Science: <div>{data.science}</div></div>
            <div className='viewcontainer--field'>Social: <div>{data.social}</div></div>
            <div className='viewcontainer--field'>Activities: <div>{data.activities}</div></div>
            <div className='viewcontainer--field'>Total Marks: <div>{data.totalmarks}</div></div>
        </div>
        }     
    </div>
  )
}

export default ViewItem