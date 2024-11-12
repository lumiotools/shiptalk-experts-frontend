"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HomePage() {
  const [expertId, setExpertId] = useState("")
  const router = useRouter()

  const handleViewExpert = (e) => {
    e.preventDefault()
    if (expertId) {
      router.push(`/expert/${expertId}`)
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-8">
      <Card className="max-w-screen-sm w-full mx-auto">
        <CardHeader>
          <CardTitle>Shiptalk Expert Management System</CardTitle>
          <CardDescription>Register or manage shipping experts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link href="/expert/new" passHref>
            <Button className="w-full">Register New Expert</Button>
          </Link>
          <form onSubmit={handleViewExpert} className="flex flex-row gap-4">
            <Input
            className="flex-[2]"
              type="text"
              placeholder="Enter Expert ID"
              value={expertId}
              onChange={(e) => setExpertId(e.target.value)}
              required
            />
            <Button type="submit" className="flex-1" variant="outline">
              View Expert Details
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}