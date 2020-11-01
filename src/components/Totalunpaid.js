import React from 'react';

const  Totalunpaid = (props) => {

const total = props.bills.filter(bill => bill.paid === false)
.reduce((acc, item) => acc + parseFloat(item.amount,10), 0)
    return(
        <div>
           <p> You owe:<b>${ total.toFixed(2) } </b>  </p>
        </div>
    )

}

export default Totalunpaid;
