import envConfig from '@/config';
import { cookies } from 'next/headers'

import React from 'react'
import Profile from './profile';

export default async function MeProfile(request: Request) {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')?.value
    console.log(sessionToken)
    const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            }
        }
    )
        .then(async (res) => {
            const payload = await res.json()
            const data = {
                status: res.status,
                payload
            }
            if (!res.ok) {
                throw data
            }
            return data
        })

        console.log(result)
    return (
        <div>  
        <h1>Profile</h1>  
        <div>Xin chào {result.payload.data.name}</div>  
        <Profile />  
        </div>

    )
}
