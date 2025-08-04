'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ColorRule } from '@/lib/types';

const formSchema = z.object({
  min: z.string().optional(),
  max: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
}).refine(data => data.min !== undefined || data.max !== undefined, {
    message: "At least one of min or max temperature is required",
    path: ["min"],
});

interface ColorRuleFormProps {
  onSave: (rule: Omit<ColorRule, 'id'>) => void;
  onClose: () => void;
}

export function ColorRuleForm({ onSave, onClose }: ColorRuleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "#ff0000",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const min = values.min ? parseFloat(values.min) : undefined;
    const max = values.max ? parseFloat(values.max) : undefined;

    if (min !== undefined && max !== undefined && min >= max) {
      form.setError("min", { message: "Min must be less than max" });
      return;
    }

    onSave({
      min,
      max,
      color: values.color,
    });
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Temp (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10" {...field} />
                  </FormControl>
                  <FormDescription>Leave blank for no minimum.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Temp (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 25" {...field} />
                  </FormControl>
                  <FormDescription>Leave blank for no maximum.</FormDescription>
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input type="color" {...field} className="p-1 h-10 w-14"/>
                </FormControl>
                <Input type="text" {...field} placeholder="#FF0000" className="w-auto flex-1" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.min?.message}</FormMessage>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Rule</Button>
        </div>
      </form>
    </Form>
  )
}
