import React from 'react';
import '../App.css'

const Duedate = (props)=>{
     console.log(props.dueDate)
     let paymentDate = new Date(props.dueDate);
     let today = new Date();
    console.log("paymentDate",paymentDate)
     
    let difference = paymentDate.getTime() - today.getTime();
    let daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    if (daysLeft > 0) {     
            return(
         <div>payable in {daysLeft} days</div>
         )} else { return(
             <div className="overdue">due immediately!!!</div>)
         }
        
} 

export default Duedate;