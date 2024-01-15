import { useEffect, useState } from 'react'

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [output, setOutput] = useState("Output")
  const [isLoading, setIsLoading] = useState(false)



  useEffect(function () {
    const controller = new AbortController()
    async function getCurrency() {
      try {

        setIsLoading(true)
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: controller.signal })
        const data = await res.json()
        setOutput(data.rates[to])

        setIsLoading(false)
      } catch (err) {
        console.log(err.message);
      }
    }


    if (to === from) return setOutput(amount)
    getCurrency()
    return function () { controller.abort() }
  }, [amount, from, to])




  function handleAmount(e) {
    setAmount(e.target.value)
  }

  function handleFrom(e) {
    setFrom(e.target.value)
  }

  function handleTo(e) {
    setTo(e.target.value)
  }





  return (
    <div>
      <input type="text" value={amount} onChange={handleAmount} disabled={isLoading} />
      <select value={from} onChange={handleFrom}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleTo}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output}
      </p>
    </div>
  )
}

export default CurrencyConverter