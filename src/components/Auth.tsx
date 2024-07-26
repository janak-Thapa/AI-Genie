import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'

const Auth = () => {
  return (
    <div>
        <SignedOut>
            <SignInButton><Button>Sign In</Button></SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton></UserButton>
        </SignedIn>
    </div>
  )
}

export default Auth