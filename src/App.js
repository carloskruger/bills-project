
import './App.css';
import axios from 'axios';
import React, {Component} from 'react';



class App extends Component {
  constructor(){
    super();
    this.state = {
      bills: [],
      company: '',
      amount: 0,
      dueDate: ''
    };
    this.handleCompanyChange =  this.handleCompanyChange.bind(this);
    this.handleAmountChange =  this.handleAmountChange.bind(this);
    this.handleDateChange =  this.handleDateChange.bind(this);
    this.handleClick =  this.handleClick.bind(this);
    this.addBill =  this.addBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this)  
    this.markBillasPaid = this.MarkBillasPaid.bind(this)
    this.markBillasUnpaid = this.MarkBillasUnpaid.bind(this)
  }

  componentDidMount() {

    axios.get(`/api/bills`)
    .then(res => {
      const bills = res.data;
      this.setState({ 
        bills: bills });
      })
  
  }

  deleteBill(id, e ){
    e.preventDefault();
    e.stopPropagation();
    axios.delete(`/api/bills/${id}`)
    .then(res => {
      const bills = res.data;
      this.setState({ 
        bills: bills });
      })
  }

  markBillasPaid(id, e){
    e.preventDefault();
    e.stopPropagation();
    console.log("markBillasPaid")
    axios.put(`/api/bills/${id}`,{paid: true})
    .then(res => {
      const bills = res.data;
      this.setState({ 
        bills: bills});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  markBillasUnpaid(id, e){
    e.preventDefault();
    e.stopPropagation();
    console.log("markBillasUnpaid")
    axios.put(`/api/bills/${id}`,{paid: false})
    .then(res => {
      const bills = res.data;
      this.setState({ 
        bills: bills});
      })
      .catch((err) => {
        console.log(err);
      });
  }

 addBill(company,amount, dueDate){
   console.log("addBill")
  
   const newObj = {"company": company, "amount": amount,  "dueDate": dueDate};
   console.log("newObj: ",newObj)
   axios.post('/api/bills',newObj )
   .then(res => {
    const bills = res.data;
    this.setState({ 
      bills: bills});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleCompanyChange(event){
      this.setState({ company: event.target.value})
  
  }
  
  handleAmountChange(event){
  
      this.setState({ amount: event.target.value})
      
  }
  handleDateChange(event ){
      this.setState({ dueDate: event.target.value}) 
  }
  
  handleClick(event){
      event.preventDefault();
      console.log("We are at handleClick at forms")
      const {company, amount, dueDate} = this.state
      this.addBill(company, amount, dueDate)
  }

    

 

  render() 


  
  
  {
  

  return (
    <div>
      <div>
          
          
                <h1> Add a new Bill </h1>
                <span>Enter the company nane:</span>
                <input type="text" name="company" value={this.state.company} onChange={ this.handleCompanyChange }/>
                <br></br>
                <br></br>
                <span>Enter the amount:</span>
                <input type="number" name="amount" value={this.state.amount} onChange={ this.handleAmountChange }/>
                <br></br>
                <br></br>
                <span>Enter the due date:</span>
                <input type="date" name="dueDate" value={this.state.dueDate} onChange={ this.handleDateChange }/>
                <br></br>
                <button onClick={ this.handleClick }>Add the new bill</button>


            
      </div>
      <div>
        <h2>Bills unpaid by Company name, amount and Due Date</h2>

{
  this.state.bills.filter(bill => (bill.paid===false)).map((billUnpaid, index) => (
    
     <p key={index}> {billUnpaid.company} {billUnpaid.amount} { billUnpaid.dueDate}<button onClick={(e) => this.markBillasPaid(billUnpaid.id, e)}>Mark as paid</button><button onClick={(e) => this.deleteBill(billUnpaid.id, e)} >Delete</button> </p>
  )
  )
  }


      </div>
      <div>
      <h2>Bills paid by Company name, amount and Due Date</h2>
  {
  this.state.bills.filter(bill => (bill.paid===true)).map((billPaid, index) => (
    
     <p key={index}> {billPaid.company} {billPaid.amount} { billPaid.dueDate} <button onClick={(e) => this.markBillasUnpaid(billPaid.id, e)}>Mark as unpaid</button><button onClick={(e) => this.deleteBill(billPaid.id, e)} >Delete</button></p>
  )
  )
  }
</div>



      
    </div>
  );
  }

}

export default App;
