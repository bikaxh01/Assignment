import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { eventFormSchema } from "@/types/zod/formTypes";
import { EventCategories, Locations } from "../common/FilterComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/apis/events.api";
import { toast } from "sonner";
import { useState } from "react";

function CreateEventDialog() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      category: "",
      date: "",
      description: "",
      imagePath: "",
      location: "",
      name: "",
      time: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      form.reset();
      setOpen(false);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("imagePath", file);
    }
  };

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    //console.log("🚀 ~ onSubmit ~ values:", values);
    mutateAsync(values);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="  h-9 bg-[#7848F4] w-[128px] rounded-lg  text-sm text-white"
        >
          Create Event
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Create Event</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex justify-between ">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        className=" w-[12rem]"
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
                      <Input type="time" className=" w-[12rem]" {...field} />
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
                        <SelectItem value={item.toLowerCase()}>
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
                        <SelectItem value={item.toLowerCase()}>
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
              name="imagePath"
              render={() => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      id="picture"
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" w-full bg-[#7848F4] text-white"
              disabled={isPending}
            >
              Create Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEventDialog;
