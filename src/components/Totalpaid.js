import React from 'react'

const Totalpaid = (props) =>{

    const total = props.bills.filter(bill => bill.paid === true)
.reduce((acc, item) => acc + parseFloat(item.amount,10), 0)
    return(
        <div>
           <p> You paid:<b>${ total.toFixed(2) } </b> </p>
        </div>
    )


}

export default Totalpaid;