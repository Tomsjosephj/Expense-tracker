
import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';


function App() {

  const [name, setName]=useState('');

  const [description,setDescription]=useState('')

  const [datetime, setDateTime]=useState('')

  const [alltransactions,settransaction]=useState([])


  const getalltransaction= async()=>{
    const url= process.env.React_app_url+'/transactions'
    const response = await axios.get(url)

    settransaction(response.data)

   
    
  }

  useEffect(()=>{
    getalltransaction()
  },alltransactions)

  console.log(alltransactions);

  function addnewtransaction(ev){

    ev.preventDefault()
    const url= process.env.React_app_url+'/transaction'

    const price= name.split(' ')[0]


  fetch(url,{
     method: 'POST',

     headers:{'Content-type':'application/json'},

     body: JSON.stringify(
      {
      price,
      name:name.substring(price.length+1),
      description,
      datetime
    
      })


  }).then(response=>{
    response.json().then(json=>{
      console.log(json);
    })
  })


    console.log(url);

    setName('')
    setDescription('')
    setDateTime('')

  
  }

  let balance=0

  for(let transaction of alltransactions){
    balance=balance+transaction.price
  }

  return (
    <main>
      <h1>$ {balance}<span></span></h1>
      <form onSubmit={addnewtransaction}>
        <div className='basic'>
          <input type='text'
          
          value={name}

          onChange={ev=>setName(ev.target.value)}
          
          placeholder={'+300 AppleIphone'} />
          <input type={'datetime-local'} 
          
          value={datetime}

          onChange={ev=>setDateTime(ev.target.value)}
          
          />
        </div>
        <div className='description'>
          <input type='text'
          
          value={description}
          onChange={ev=>setDescription(ev.target.value)}
          placeholder={'Description'} />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>

      <div className='transactions'>
       
       {

          alltransactions.map(item=>
          <div className='transaction'>
          <div className='left'>
            <div className='name'>{item.name}</div>
            <div className='description'>{item.description}</div>
          </div>
          <div className='right'>
            <div className={'price'+(item.price<0?' red':' green')}>{item.price}</div>
            <div className='datetime'>{item.datetime}</div>
          </div>

        </div>)

       }
      

      </div>
    </main>
  );
}

export default App;
