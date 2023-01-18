import React, { useEffect, useState } from 'react'
import { useForm,FormProvider,SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import { STUDENT_FORM_ELEMENTS } from './helper'
import DynamicFieldLoader from '../../SharedComponents/DynamicFieldLoader'
import { useNavigate, useParams } from 'react-router-dom'
import{PrimaryButton} from '@fluentui/react'
import './StudentForm.scss'

const StudentForm = () => {

    const [submittedData, setSubmittedData] = useState();

    const [StudentData, setStudentData] = useState();
    
    const editId = useParams()

    const navigation = useNavigate()
    interface IStudentForm{
        name?:string,
        rollnumber?:number,
        english?:number,
        telugu?:number,
        hindhi?:number,
        science?:number,
        social?:number,
        activities?:number,
        totalmarks?:number
    }

    const StudentFormSchema:yup.SchemaOf<IStudentForm> = yup.object().shape({
        name:yup.string(),
        rollnumber:yup.number(),
        english:yup.number(),
        telugu:yup.number(),
        hindhi:yup.number(),
        science:yup.number(),
        social:yup.number(),
        activities:yup.number(),
        totalmarks:yup.number()
    })

    const StudentFormMethods = useForm<any>({
        mode:"all",
        resolver: async(data,context,options) =>{
            return yupResolver(StudentFormSchema)(data,context,options)
        }
    })

    

    const getAdditionalProps = (item:any) =>{
        item.control = StudentFormMethods.control;
        item.setValue = StudentFormMethods.setValue;
        item.register = StudentFormMethods.register;
        return item
    }

    const StudentFormSubmitHandler:SubmitHandler<any> = async(data:any)=>{
        console.log(data);
        setSubmittedData(data);
        if(editId.id){
            editEntry(data)
        }else{newEntry(data);}
        navigation('/view')
        
    }

    const getEntry =async ()=>{
        try{
            const res =await axios.get(`http://localhost:5000/data/${editId.id}`)
            setStudentData(res.data)
        }catch(err){
            console.log(err);
            
        }

    }
    const newEntry = (data:any) =>{
        const newEntryId = Math.random()
        const newEntryData = {...data,newEntryId}
        try{
            const res = axios.post("http://localhost:5000/data", newEntryData)
        }catch(err){
            console.log(err);
            
        }
    }

    const editEntry = async(data:any)=>{
        try{
            const res = await axios.put(`http://localhost:5000/data/${editId.id}`, data)
            
        }catch(err){
            console.log(err);
            
        }

    }

    useEffect(()=>{
        getEntry()
    },[editId])

    useEffect(()=>{
        StudentData&&
            Object.entries(StudentData).forEach(([key,value]):any=>{
                StudentFormMethods.setValue(key,value,{shouldValidate:true})
            })
    },[StudentData])

  return (
    <div className='mainwrapper-form'>
        <FormProvider {...StudentFormMethods}>
            <div className='mainwrapper-form--formcontainer'>
            <form  onSubmit={StudentFormMethods.handleSubmit(StudentFormSubmitHandler)}>
                {
                    STUDENT_FORM_ELEMENTS.map((item:any)=>{
                        const updatedItem = getAdditionalProps(item)
                        return DynamicFieldLoader(item.type,updatedItem)
                    })
                }
                {/* <input type={"submit"}/> */}
                <PrimaryButton text='Submit' onClick={StudentFormMethods.handleSubmit(StudentFormSubmitHandler)} ></PrimaryButton>
            </form>
            </div>
        </FormProvider></div>
  )
}

export default StudentForm