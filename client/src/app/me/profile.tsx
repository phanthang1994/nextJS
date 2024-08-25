'use client'
import { useEffect } from "react"  

import accountApiRequest from "@/apiRequests/account"

export default function Profile() {  
 
  useEffect(() => {  
    const fetchRequest = async (): Promise<void> => {  
      const result = await accountApiRequest.meClient()
      console.log(result)
    }  

    fetchRequest()
    
  }, [])  
  return (  
    <div>Profile</div>  
  )
}