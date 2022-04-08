import React, { useState } from 'react'
import axios from "axios"

const App = () => {
  const [decision, setDecision] = useState(false);
  const [ppcode, setPpcode] = useState("");
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(1);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/decision", {personalCode: ppcode, requestLoanAmount: amount, requestLoanPeriod: period});
      setDecision(data);
    } catch (error) {
      const errMsg = error.response.data;
      setError(error.response.data);
      console.log(error.response.data)
    }
  }
  return (
    <div>
      <h1 className='display-6 text-center mb-5'>Decision Engine</h1>
      <div className='container'>
      <form onSubmit={handleSubmit}> 
  <div class="form-group">
    <label for="ppcode">Personal Code</label>
    <input type="text" class="form-control" id="ppcode" aria-describedby="emailHelp" placeholder="Enter Personal Code" onChange={(e) => setPpcode(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="amount">Loan Amount</label>
    <input type="number" class="form-control" id="amount" placeholder="Enter Loan Amount" min={2000}max={10000} onChange={(e) => setAmount(e.target.value)}/>
  </div>
 
  <div class="form-group">
    <label for="period">Loan Period</label>
    <input type="number" class="form-control" id="period" placeholder="Enter Loan Period" min={12} max={60} onChange={(e) => setPeriod(e.target.value)}/>
  </div>
 
  <button type="submit" class="btn btn-primary mt-2">Submit</button>
</form>
{decision && (<p className='mt-2'>{decision}</p>)}
 {error && (<p className='text-danger mt-2'>{error.errorMessage}</p>)}
 {error && (<p className='text-danger mt-2'>{error.personalCode}</p>)}
 {error && (<p className='text-danger mt-2'>{error.requestLoanAmount}</p>)}
 {error && (<p className='text-danger mt-2'>{error.requestLoanPeriod}</p>)}
 
      </div>
    </div>
  )
}

export default App