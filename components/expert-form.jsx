"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  linkedin: z.string().url("Must be a valid LinkedIn URL"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  designation: z.string().min(1, "Designation is required"),
  years_in_industry: z.number().min(1, "Years in industry is required"),
  profile_picture: z
    .instanceof(File, { message: "Profile picture is required" })
    .optional()
    .or(z.string())
    .refine((value) => {
      if (typeof value === "string") return true;
      return value instanceof File;
    }, "Profile picture must be a file or a URL"),
});

export function ExpertForm({ initialData, onSubmit, submitButtonText }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      phone: "",
      linkedin: "",
      email: "",
      company: "",
      designation: "",
      years_in_industry: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (initialData?.id) {
        formData.append("id", initialData.id);
      }
      await onSubmit(formData);
    } catch (error) {
      toast({
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {initialData?.profile_picture && (
          <div className="mb-4">
            <img
              src={
                process.env.NEXT_PUBLIC_API_URL + initialData.profile_picture
              }
              alt="Profile Picture"
              className="rounded-full size-32 object-cover border"
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your 10-digit phone number"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your LinkedIn profile URL"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your company name"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your job title or designation"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="years_in_industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years in Shipping Industry</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the number of years in the shipping industry"
                  type="number"
                  value={parseInt(field.value) || 0}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(parseInt(value) || "");
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile_picture"
          render={({ field: { value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>
                {initialData ? "Update Profile Picture" : "Profile Picture"}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      fieldProps.onChange(file);
                    }
                  }}
                  required={!initialData}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
