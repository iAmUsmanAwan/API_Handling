import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // here the loading shows the time required to fetch the data from api, and we have also set the timeout of 2 seconds in the index.js in the backend, due to which we get data after 2 seconds

  useEffect(() => {
     // here we can either use axios by default like this 
    // axios.get('/api/products').then((res) => {setProducts(response.data)})

    // or IIFE, if we want it to await this, but we Cannot make the first callback in the useEffect hook async so we use IIFE
    ;(async () => {
      try {
        setLoading(true)  
        setError(false)
        const response = await axios.get('/api/products') 
        console.log(response.data);
        setProducts(response.data)
        setLoading(false)
      } 
      catch (error) {
        setError(true)
        setLoading(false)
      }
    })()

  }, [])

  if (error) {
    // this will run if any error in the api handling
    return <h1>Something went Wrong 🙁</h1>
  }

  if (loading) {
    // this will run while loading is true
    return <h1>Loading please wait 🙂 ↕ </h1>
  }

  return (
    <>
      <h1>HELLO PEEPS</h1>
      <h2>Number of Products are {products.length}</h2>
    </>
  )
}

export default App
