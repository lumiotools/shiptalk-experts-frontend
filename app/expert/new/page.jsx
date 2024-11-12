"use client";

import { ExpertForm } from "@/components/expert-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterExpertPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experts`, {
        method: "POST",
        body: formData,
      })
    ).json();

    if (!response.success)
      throw new Error(response.message || "Failed to register expert");

    toast({ description: "Expert registered successfully" });
    router.push("/");
  };

  return (
    <div className="p-8">
      <Card className="max-w-screen-sm mx-auto">
        <CardHeader>
          <CardTitle>Register an Expert</CardTitle>
          <CardDescription>New Expert Registration</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpertForm
            onSubmit={handleSubmit}
            submitButtonText="Register Expert"
          />
        </CardContent>
      </Card>
    </div>
  );
}
