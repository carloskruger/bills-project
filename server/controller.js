let bills = [{id: 0, company: 'Verizon', dueDate: '2020-11-30', amount: 120.20, paid: false}];

let id = 0;

module.exports = {

getAllBills: (req, res) => {
    res.status(200).send(bills)
},


editBill: (req, res) => {
    const updateId  = +req.params.id;
    const {id, company, dueDate, amount, paid} = req.body
    let index = -1;

    for (let i = 0; i < bills.length; i++){
        if (bills[i].id === updateId){
            index = i;
        };
     
    }

    // console.log("bills[index]", bills[index])
    if (company) { bills[index].company =  company };

    if (dueDate) { bills[index].dueDate =  dueDate };

    if (amount) { bills[index].amount =  amount };

    if (paid) { bills[index].paid =  true} else { bills[index].paid =  false}   ;
 
res.status(200).send(bills)
},


deleteBill: (req, res) => {
    const deleteId  = +req.params.id;
    let index = -1;
   console.log(deleteId);
   for (let i = 0; i < bills.length; i++){
       console.log(bills[i],deleteId)
       if (bills[i].id === deleteId){
           index = i;
       };
    
   }
     console.log(index)
      bills.splice(index,1);

    res.status(200).send(bills)
},


addBill: (req, res) => {
    const {
        company,
        dueDate,
        amount
} = req.body;

const newObj = {id: ++id, 
    company: company, dueDate: dueDate, 
    amount: amount, 
    paid: false}

    bills.push(newObj);

res.status(200).send(bills)
}
}