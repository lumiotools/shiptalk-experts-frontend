"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function HomePage() {
  const [experts, setExperts] = useState();

  const fetchExperts = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experts`)
    ).json();
    if (response.success) {
      setExperts(response.data.experts);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-8">
      <Card className="max-w-screen-sm w-full mx-auto">
        <CardHeader>
          <CardTitle>Shiptalk Expert Management System</CardTitle>
          <CardDescription>Register or manage shipping experts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link href="/expert/new" className="mb-4">
            <Button className="w-full">Register New Expert</Button>
          </Link>

          {experts ? (
            experts.map((expert) => (
              <div key={expert.id} className="flex items-center gap-4">
                <img
                  className="size-10 object-cover rounded-full border"
                  src={process.env.NEXT_PUBLIC_API_URL + expert.profile_picture}
                />
                <div>
                  <p className="font-bold">{expert.name}</p>
                  <p className="text-sm">{expert.designation}</p>
                </div>
                <Link className="ml-auto" href={`/expert/${expert.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-center p-8">
              <LoaderCircle className="animate-spin size-10 text-primary" />
            </div>
          )}
          {/* <form onSubmit={handleViewExpert} className="flex flex-row gap-4">
            <Input
              className="flex-[2]"
              type="text"
              placeholder="Enter Expert ID"
              value={expertId}
              onChange={(e) => setExpertId(e.target.value)}
              required
            />
           
          </form> */}
        </CardContent>
      </Card>
    </div>
  );
}
