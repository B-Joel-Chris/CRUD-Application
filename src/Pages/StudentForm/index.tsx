import React, { useEffect, useState } from 'react'
import { useForm,FormProvider,SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import { newSTUDENT_FORM_ELEMENTS } from './helper'
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
        hindi?:number,
        science?:number,
        social?:number,
        activities?:number,
        totalmarks?:number
    }

    const StudentFormSchema:yup.SchemaOf<IStudentForm> = yup.object().shape({
        name:yup.string().required().min(2),
        rollnumber:yup.number().required(),
        english:yup.number().required().max(100),
        telugu:yup.number().required().max(100),
        hindi:yup.number().required().max(100),
        science:yup.number().required().max(100),
        social:yup.number().required().max(100),
        activities:yup.number().required().max(100),
        totalmarks:yup.number().required().max(100)
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

    console.log(StudentFormMethods.watch(),StudentFormMethods.formState.errors);
    

  return (
    <div className='mainwrapper-form'>
        <div className="mainwrapper-form__formtitle"><p>Student <span style={{color:"#396CC5"}}>Form</span></p></div>
        
        <FormProvider {...StudentFormMethods}>
            <div className='mainwrapper-form--formcontainer'>
            <form  onSubmit={StudentFormMethods.handleSubmit(StudentFormSubmitHandler)}>
                {
                    newSTUDENT_FORM_ELEMENTS.map((row:any)=>{
                       return(<div className={row.className}>
                            {
                                row.control.map((item:any)=>{
                                    const updatedItem = getAdditionalProps(item)
                                    return DynamicFieldLoader(item.type,updatedItem)
                                })
                            }
                        </div>
                       )  
                    })
                }
                <div className='mainwrapper-form--formcontainer__footer'>
                {/* <input type={"submit"}/> */}
                <PrimaryButton text='Submit' onClick={StudentFormMethods.handleSubmit(StudentFormSubmitHandler)} ></PrimaryButton>
                </div>
            </form>
            </div>
        </FormProvider></div>
  )
}

export default StudentForm