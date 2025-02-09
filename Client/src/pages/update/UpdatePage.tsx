import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { updateFormSchema } from "@/types/zod/formTypes";
// import { EventCategories, Locations } from "../common/FilterComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, getEventData } from "@/apis/events.api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Missing import
import {
  EventCategories,
  Locations,
} from "@/components/common/FilterComponent";

const UpdatePage = () => {
  const queryClient = useQueryClient();

  // Get query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");

  const initialData = useQuery({
    queryKey: [eventId],
    queryFn: () => {
      if (!eventId) return;
      return getEventData(eventId);
    },
  });

  // Initialize form
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      category: "",
      date: "",
      description: "",
      location: "",

      time: "",
    },
  });

  // Mutation for creating event
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      form.reset();
  
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  if (initialData.isPending) {
    return (
      <>
        <h1>Loading.....</h1>
      </>
    );
  }
  // Handle form submit
  const onSubmit = (values: z.infer<typeof updateFormSchema>) => {
    mutateAsync(values);
  };
  if (!eventId) {
    return (
      <>
        <h1>Invalid Event ID</h1>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[40%_60%] h-screen">
        <div className="bg-[url('/assets/side.png')] bg-cover bg-center flex items-center justify-center p-5 text-white">
          <h1 className="text-3xl font-bold">
            Secure your access, unlock possibilities.
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-[38rem] w-[36rem] p-5 flex flex-col gap-6">
            <div className="font-bold flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl">
                Event <span className="text-[#7848F4]">Hive</span>
              </h2>
              <h1 className="text-2xl">Update to Event Hive</h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          defaultValue={initialData.data.data.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={initialData.data.data.date}
                            className="w-[12rem]"
                            placeholder="Password"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" className="w-[12rem]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          defaultValue={initialData.data.data.description}
                          placeholder="About Event"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Locations.map((item) => (
                            <SelectItem key={item} value={item.toLowerCase()}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EventCategories.map((item) => (
                            <SelectItem key={item} value={item.toLowerCase()}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#7848F4] text-white"
                  disabled={isPending}
                >
                  Update Event
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
