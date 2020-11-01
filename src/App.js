
import './App.css';
import axios from 'axios';
import React, {Component} from 'react';
import Totalunpaid from './components/Totalunpaid';
import Totalpaid from './components/Totalpaid';
import Duedate from './components/Duedate';



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

 addBill(company, amount, dueDate){
   console.log("addBill")
  
   const newObj = {"company": company, "amount": +amount,  "dueDate": dueDate};
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

          <header>
            <h1>Bills Tracker</h1>
            <Totalunpaid bills={this.state.bills} />
            <Totalpaid bills={this.state.bills} />
          </header>
      <main className="bigBodyContainer">
          <div className="form">

         
          
                <h2> Add new bill </h2>
                <div className="formfirstrow">
                <span>Enter company name: </span>
                <input type="text" name="company" value={this.state.company} onChange={ this.handleCompanyChange }/>
                </div>
                <br></br>
                <br></br>
                <div className="formsecondrow">
                <span>Enter amount: </span>
                <input type="number" name="amount" value={this.state.amount} onChange={ this.handleAmountChange }/>
                </div>
                <br></br>
                <br></br>
              <div className="formthirdrow">
                <span>Enter due date: </span>
                <input type="date" name="dueDate" value={this.state.dueDate} onChange={ this.handleDateChange }/>
                </div>
                <br></br>
                <br>
                </br>
                <button onClick={ this.handleClick }>Add new bill</button>


            
      </div>


      <div>
        <h2>Unpaid bills</h2>

          {
            this.state.bills.filter(bill => (bill.paid===false)).map((billUnpaid, index) => (
    
     <div className="unpaidRow" key={index}> {billUnpaid.company} ${parseFloat(billUnpaid.amount,10).toFixed(2)} due: { billUnpaid.dueDate} <button onClick={(e) => this.markBillasPaid(billUnpaid.id, e)}>Mark paid</button>  <button className="delbutton" onClick={(e) => this.deleteBill(billUnpaid.id, e)} >Delete</button> </div>
  )
  )
  }


      </div>

      <div>
          <h2>Paid bills</h2>
  {
  this.state.bills.filter(bill => (bill.paid===true)).map((billPaid, index) => (
    
     <div className="paidRow" key={index}> {billPaid.company} ${parseFloat(billPaid.amount).toFixed(2)}  due: { billPaid.dueDate} <button onClick={(e) => this.markBillasUnpaid(billPaid.id, e)}>Mark unpaid</button>  <button className="delbutton" onClick={(e) => this.deleteBill(billPaid.id, e)} >Delete</button></div>
  )
  )
  }
      </div>

      </main>

      
    </div>
  );
  }

}

export default App;
