import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [cryptocurrencies, setcryptocurrencies] = useState([])
  const [cryptoTo, setcryptoTo] = useState(null)
  const [cryptoFrom, setcryptoFrom] = useState(null)
  const [amount, setamount] = useState(null)
  const [result, setresult] = useState(null)
  const fetchCrypto = async() =>{
    var requestOptions = {
      method: 'GET',
      Authorization :"Bearer 9d228abf-8e1e-407f-95b9-edc1d8635583",
      redirect: 'follow',
    };
    const response = await fetch("https://api.coincap.io/v2/assets?limit=1000",requestOptions)
    const responseparshed = await response.json()
    setcryptocurrencies(responseparshed.data)
  }

  useEffect(() => {
    fetchCrypto();
  },[cryptoFrom,cryptoTo])

  const handleChange = (e) =>{
    if(e.target.id === "select-one"){
      setcryptoFrom(e.target.value)
    }else if(e.target.id === "select-two"){
      setcryptoTo(e.target.value)
    }
  }

  useEffect(() => {
    if(cryptoFrom && cryptoTo) {
      let option1 = document.querySelector(`#${cryptoFrom}`).getAttribute("data_price")
      let option2 = document.querySelector(`#${cryptoTo}`).getAttribute("data_price")
      setresult(((option1/option2)*amount).toFixed(2));
    }
  },[amount,cryptoFrom,cryptoTo])
  const convertamount = (e) =>{
    setamount(e.target.value)
  }
  
  return (
    <div className="App">
      <section className='converter'>
        <h1>Crypto Converter</h1>
        <select id='select-one' onChange={handleChange} >
          {cryptocurrencies.map(crypto => <option value={crypto.id} id={crypto.id} key={crypto.id} data_price={crypto.priceUsd}>{crypto.id}</option>)}
          </select>
        <select id='select-two' onChange={handleChange} >
          {cryptocurrencies.map(crypto => <option value={crypto.id} id={crypto.id} key={crypto.id} data_price={crypto.priceUsd}>{crypto.id}</option>)}
          </select>
        
        <input type="text" id='useramount' onChange={convertamount}  placeholder="Amount"/>
        <section className='fromto'>
        <p>{cryptoFrom}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
        <p>{cryptoTo}</p>
        </section>
        <section className='result'>
          <h2>{result}</h2>
          <p>{cryptoTo}</p>
        </section>
      </section>

    </div>
  );
}

export default App;
