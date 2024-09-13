"use client";

import {SessionProvider} from "next-auth/react"

const ProviderWrapper = ({children})=>{
    return <SessionProvider>
        {children}
    </SessionProvider>
}
export default ProviderWrapper