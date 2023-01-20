// export const STUDENT_FORM_ELEMENTS = [

    
//     {
//         type:"FormTextField",
//         name:"studentname",
//         label:"Student Name",
//         isRequired:true
//     },
//     {
//         type:"FormTextField",
//         name:"rollnumber",
//         label:"Roll Number",
//         isRequired:true
//     },
//     {
//         type:"FormTextField",
//         name:"english",
//         label:"English",
//         isRequired:true
//     },

//     {
//         type:"FormTextField",
//         name:"telugu",
//         label:"Telugu",
//         isRequired:true
//     },

//     {
//         type:"FormTextField",
//         name:"hindi",
//         label:"Hindi",
//         isRequired:true
//     },

//     {
//         type:"FormTextField",
//         name:"science",
//         label:"Science",
//         isRequired:true
//     },
//     {
//         type:"FormTextField",
//         name:"social",
//         label:"Social",
//         isRequired:true
//     },
//     {
//         type:"FormTextField",
//         name:"activities",
//         label:"Activities",
//         isRequired:false
//     },
//     {
//         type:"FormTextField",
//         name:"totalmarks",
//         label:"Total Marks",
//         isRequired:true
//     }
// ]

export const newSTUDENT_FORM_ELEMENTS=[

    {
        row:0,
        className:"row",
        control:[
            { type:"FormTextField",
            name:"name",
            label:"Student Name",
            isRequired:true
            },
            
            {
                type:"FormTextField",
                name:"rollnumber",
                label:"Roll Number",
                isRequired:true
            }
        ]
    },

    {
        row:1,
        className:"row",
        control:[
            {
                type:"FormTextField",
                name:"english",
                label:"English",
                isRequired:true
            },
        
            {
                type:"FormTextField",
                name:"telugu",
                label:"Telugu",
                isRequired:true
            },
        
            {
                type:"FormTextField",
                name:"hindi",
                label:"Hindi",
                isRequired:true
            }
        ]
    },
    {
        row:2,
        className:"row",
        control:[

            {
                type:"FormTextField",
                name:"science",
                label:"Science",
                isRequired:true
            },
            {
                type:"FormTextField",
                name:"social",
                label:"Social",
                isRequired:true
            },
            {
                type:"FormTextField",
                name:"activities",
                label:"Activities",
                isRequired:false
            }

        ]
    },

    {
        row:3,
        className:"row",
        control:[
            {
                type:"FormTextField",
                name:"totalmarks",
                label:"Total Marks",
                isRequired:true
            }
        ]
    }

]