import React from 'react';

const Duedate = (props)=>{
     console.log(props.dueDate)
     let paymentDate = new Date(props.dueDate);
     let today = new Date();
    console.log("paymentDate",paymentDate)
     console.log("today",today)
    let difference = paymentDate.getTime() - today().getTime;
    let daysLeft = difference / (1000 * 3600 * 24);
     return(
         <div>{daysLeft} left</div>
     )

} 

export default Duedate;