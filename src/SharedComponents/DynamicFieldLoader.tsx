import React from 'react'
import FormTextField from './FormTextField'

const DynamicFieldLoader = (field:string,item:any) => {
 switch(field){
    case("FormTextField"):
        return <div className="field"> <FormTextField {...item}/></div>
    default:
        return "component missing";
 }
}

export default DynamicFieldLoader