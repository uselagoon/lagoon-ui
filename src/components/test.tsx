"use client";

import { useSession,signIn, signOut } from "next-auth/react";

export default function Test(){

    const {data} = useSession()
    console.log( data )

    return <button onClick={() => signIn("keycloak")}>SIGN IN</button>
}