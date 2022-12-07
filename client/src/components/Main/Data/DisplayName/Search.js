import AllConnectCodes from './All.js'
import { useEffect, useState } from "react"
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { QUERY_CONNECT_CODE_BY_CODE, QUERY_DISPLAY_NAME_BY_NAME } from '../../../../utils/apollo/queries.js'



const DisplayNamesLanding = () => {
   const navigate = useNavigate()
   const [query, setQuery] = useState(``)
   const [getDisplayName, { loading, error, data }] = useLazyQuery(QUERY_DISPLAY_NAME_BY_NAME, {
      variables: { 'displayName': query }
   })
   const [notFound, setNotFound] = useState(false)
   const handleSetQuery = (e) => {
      e.preventDefault()
      setQuery((e.target.value).trim())
   }
   const handleMakeQuery = async (e) => {
      setQuery((e.target.children[0].value).trim())
      e.preventDefault()
      if (!query) {
         return navigate('/data/displayname/all')
      }
      await getDisplayName()
      while (loading) {
         console.log(`loading`)
      }
      if (error || !data) {
         setNotFound(true)
         return console.log(`error! ${error}`)
      }
      setNotFound(false)
      return navigate(`/data/displayname/${data.displayNameByName._id}`)
      // const { loading, data } = useQuery(QUERY_CONNECT_CODE_BY_CODE)

   }
   return (
      <>
         <p>Display Names Landing</p>
         <form type='submit' onSubmit={handleMakeQuery}>
            <input type="search" onChange={handleSetQuery} placeholder="Search by Display Name"></input>
            <button>search</button>
         </form>
         {notFound ? <p>Game not found!</p> : <></>}

         <Outlet />
      </>
   )
}

export default DisplayNamesLanding