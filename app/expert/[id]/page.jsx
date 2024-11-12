"use client";

import { ExpertForm } from "@/components/expert-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExpertDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [expertData, setExpertData] = useState(null);

  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        const response = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experts/${id}`)
        ).json();

        if (response.success) {
          setExpertData(response.data.expert);
        } else {
          throw new Error(response.message || "Failed to fetch expert data");
        }
      } catch (error) {
        toast({
          description:
            error instanceof Error
              ? error.message
              : "Failed to fetch expert data",
          variant: "destructive",
        });

        router.replace("/");
      }
    };

    if (id) {
      fetchExpertData();
    }
  }, [id, toast]);

  const handleSubmit = async (formData) => {
    try {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experts/${id}`, {
          method: "PUT",
          body: formData,
        })
      ).json();

      if (!response.success)
        throw new Error(response.message || "Failed to update expert");

      toast({ description: "Expert updated successfully" });
      router.push("/");
    } catch (error) {
      toast({
        description:
          error instanceof Error ? error.message : "Failed to update expert",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this expert?")) {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experts/${id}`, {
          method: "DELETE",
        })
      ).json();

      if (!response.success)
        throw new Error(response.message || "Failed to delete expert");

      toast({ description: "Expert deleted successfully" });
      router.push("/");
    }
  };

  if (!expertData) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <LoaderCircle className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card className="max-w-screen-sm mx-auto">
        <CardHeader>
          <CardTitle>Expert Details</CardTitle>
          <CardDescription>View or update expert information</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpertForm
            initialData={expertData}
            onSubmit={handleSubmit}
            submitButtonText="Update Expert"
          />
          <div className="mt-6">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-full"
            >
              Delete Expert
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
