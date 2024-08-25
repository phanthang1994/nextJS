'use client'
import envConfig from "@/config"
import { useEffect } from "react"  
import { useAppContext } from "../AppProvider"
import accountApiRequest from "@/apiRequests/account"

export default function Profile() {  
  const { sessionToken } = useAppContext()  
  useEffect(() => {  
    const fetchRequest = async () => {  
      const result = await accountApiRequest.me(sessionToken ?? '')
      console.log(result)
    }  

    fetchRequest()
    
  }, [sessionToken])  
  return (  
    <div>Profile</div>  
  )
}