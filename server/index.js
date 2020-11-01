const express = require('express');

const app = express();

const ctrl = require("./controller")

app.use(express.json());

app.get('/api/bills', ctrl.getAllBills);
app.put('/api/bills/:id',ctrl.editBill );
app.delete('/api/bills/:id', ctrl.deleteBill);
app.post('/api/bills', ctrl.addBill);



const port = 4000;

app.listen(port,() => console.log( `app is listenibng in ${port}`))
;
