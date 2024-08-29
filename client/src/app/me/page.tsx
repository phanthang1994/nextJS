
import { cookies } from 'next/headers'

import React from 'react'
import Profile from './profile';
import accountApiRequest from '@/apiRequests/account';

export default async function MeProfile(request: Request) {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')?.value
    // console.log(sessionToken)
    const result = await accountApiRequest.me(sessionToken ?? '');
        // console.log(result)
    return (
        <div>  
        <h1>Profile</h1>  
        <div>Xin chào {result.payload.data.name}</div>  
        <Profile />  
        </div>

    )
}
