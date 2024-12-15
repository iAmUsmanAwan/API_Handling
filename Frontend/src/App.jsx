import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  // //? Here we are using custom react query hook
  // const [products, error, loading ] = customReactQuery('/api/products')

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)   // here the loading shows the time required to fetch the data from api, and we have also set the timeout of 2 seconds in the index.js in the backend, due to which we get data after 2 seconds
const [search, setSearch] = useState('')   // for the search input field, setting initial value to empty. If we initialize it with "Gun" it will output all the instances which name contain "Gun" 

  useEffect(() => {
     // here we can either use axios by default like this 
    // axios.get('/api/products').then((res) => {setProducts(response.data)})

    // or IIFE, if we want it to await this, but we Cannot make the first callback in the useEffect hook async so we use IIFE

    const controller = new AbortController()
    // AbortController does not entertain the old requests, but send it in the catch section of the try catch (so we have to properly handle it in the catch). we have to add this in the axios.get method . now controller is a packet which holds all the information about the requests.
    //? it is basically written to avoid race condition 
    // to cancel old request API calls Debouncing concept is used

    ;(async () => {
      try {
        setLoading(true)  
        setError(false)
        // const response = await axios.get('/api/products') // for default
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal // adding AbortController signal to axios request
        }) // for special input search
        console.log(response.data);
        setProducts(response.data)
        setLoading(false)
      } 
      catch (error) {
        if (axios.isCancel(error)) {   // we have to add this to handle old requests properly
          console.log('Request Canceled', error.message);
          return;
        }
        setError(true)
        setLoading(false)
      }
    })()

    //* Clean up code   (unmounting)
    return () => {
      controller.abort() // cancel the request in the useEffect cleanup function
    }

  }, [search])


  // //? we can handle errors sperately like this, Or we can handle all the errors in one return as shown below 
  // if (error) {
  //   // this will run if any error in the api handling
  //   return <h1>Something went Wrong 🙁</h1>
  // }

  // if (loading) {
  //   // this will run while loading is true
  //   return <h1>Loading please wait 🙂 ↕ </h1>
  // }

  return (
    <>
      <h1>HELLO PEEPS</h1>

      <input type="text" placeholder='Search'
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      />

    {loading && (<h1>Loading please wait 🙂 ↕ </h1>)}
    {error && (<h1>Something went Wrong 🙁 ��</h1>)}

      <h2>Number of Products are {products.length}</h2>
    </>
  )
}

export default App

// const customReactQuery = (urlPath) => {
  
//   //? This is so generic code that almost every developer use in production, We can also make this a custom hook
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(false)
//   // here the loading shows the time required to fetch the data from api, and we have also set the timeout of 2 seconds in the index.js in the backend, due to which we get data after 2 seconds

//   useEffect(() => {
//      // here we can either use axios by default like this 
//     // axios.get('/api/products').then((res) => {setProducts(response.data)})

//     // or IIFE, if we want it to await this, but we Cannot make the first callback in the useEffect hook async so we use IIFE
//     ;(async () => {
//       try {
//         setLoading(true)  
//         setError(false)
//         // const response = await axios.get('/api/products') 
//         const response = await axios.get(urlPath)    //? as this is a generic function 
//         console.log(response.data);
//         setProducts(response.data)
//         setLoading(false)
//       } 
//       catch (error) {
//         setError(true)
//         setLoading(false)
//       }
//     })()

//   }, [])

//   //? Here we just return our states
//   return [    // we can return this as a object or as an array depending on the usecases
//     products,
//     error,
//     loading
//   ]
// }