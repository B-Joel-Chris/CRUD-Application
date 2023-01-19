import React, { useEffect, useState } from 'react'
import {DetailsList, DetailsListLayoutMode, IColumn,Link,PrimaryButton} from '@fluentui/react'
import * as rrdom from 'react-router-dom'
import axios from 'axios'
import * as rdom from 'react-router-dom'
import './ViewDetails.scss'
import {MdMode,MdDelete} from 'react-icons/md'

const ViewDetails = () => {
    const [currentStudentData, setCurrentStudentData] = useState();

    const tableColumns:IColumn[]=[
        {
            key:"col1",
            fieldName:"studentname",
            name:"Name",
            minWidth:80,
            maxWidth:100,
            isResizable:true
        },
        {
            key:"col2",
            fieldName:"rollnumber",
            name:"Roll Number",
            minWidth:40,
            maxWidth:100,
            isResizable:true
        },
        {
            key:"col3",
            fieldName:"english",
            name:"English",
            minWidth:40,
            maxWidth:100,
            isResizable:true
        },
        {
            key:"col4",
            fieldName:"telugu",
            name:"Telugu",
            minWidth:50,
            maxWidth:70,
            isResizable:true
        },
        {
            key:"col5",
            fieldName:"hindi",
            name:"Hindi",
            minWidth:40,
            maxWidth:70,
            isResizable:true
        },
        {
            key:"col6",
            fieldName:"science",
            name:"Science",
            minWidth:40,
            maxWidth:70,
            isResizable:true
        },
        {
            key:"col7",
            fieldName:"social",
            name:"Social",
            minWidth:40,
            maxWidth:70,
            isResizable:true
        },
        {
            key:"col8",
            fieldName:"activities",
            name:"Activities",
            minWidth:40,
            maxWidth:100,
            isResizable:true
        },
        {
            key:"col9",
            fieldName:"totalmarks",
            name:"Total Marks",
            minWidth:40,
            maxWidth:100,
            isResizable:true
        },
        {
            key:"col10",
            fieldName:"newEntryId",
            name:" ",
            minWidth:100,
            maxWidth:150,
            isResizable:true,
            onRender:(item:any)=>(
                item&&
                    <>
                    <div className='maincontainer__tablewrapper--entryactions'>
                    <rrdom.Link to={`/update/${item.id}`}><MdMode size={15}/></rrdom.Link>
                   <Link onClick={()=>deleteEntry(item.id)}><MdDelete size={15} color={"black"}/></Link>
                   </div>
                    </>
            )
        }

    ]

    const deleteEntry=async(item:any)=>{
        // console.log(item);
        
        try{
            const res = await axios.delete(`http://localhost:5000/data/${item}`)
        }catch(err){
            console.log(err);
            
        }
    }

    const getCurrentStudentData =async()=>{
        try{
            const res =await axios.get("http://localhost:5000/data")
            setCurrentStudentData(res.data)
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getCurrentStudentData();
    },[])

    useEffect(()=>{
        getCurrentStudentData();
    },[currentStudentData])

  return (
    <div className='maincontainer'>
        <div className='maincontainer__toolbar'><rdom.Link to={"/add"}><PrimaryButton text='Add'/></rdom.Link></div>
        <div className='maincontainer__tablewrapper'>
        {
            currentStudentData&&
                <DetailsList
                    columns={tableColumns}
                    items={currentStudentData}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                />
        }
        </div>
    </div>
  )
}

export default ViewDetails

