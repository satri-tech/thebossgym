'use client'
import { Button } from "@/core/components/ui/button"
import { signOut } from "next-auth/react"

const page = () => {
    return (
        <div>Admin Panel

            <Button onClick={() => {
                signOut()
            }}>Log Out</Button>
        </div>
    )
}

export default page