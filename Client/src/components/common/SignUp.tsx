import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUpformSchema } from "@/types/zod/formTypes";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/apis/user.api";
import { toast } from "sonner";

function SignUp() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const form = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
  });

  function onSubmit(values: z.infer<typeof signUpformSchema>) {
    mutateAsync(values);
  }
  return (
    <div className=" grid grid-cols-[40%_60%] h-screen">
      <div className="  bg-[url('/assets/side.png')]  bg-cover bg-center flex items-center justify-center p-5 text-white">
        <h1 className=" text-3xl font-bold">
          Secure your access, unlock possibilities.
        </h1>
      </div>
      <div className="  flex items-center justify-center">
        <div className="   h-[38rem]  w-[36rem] p-5 flex flex-col gap-6">
          <div className=" font-bold flex flex-col items-center justify-center gap-4">
            <h2 className=" text-xl">
              Event <span className=" text-[#7848F4]">Hive</span>
            </h2>
            <h1 className=" text-2xl">Sign Up to Event Hive</h1>
            
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="GUEST">Guest</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className=" w-full bg-[#7848F4] text-white"
                disabled={isPending}
              >
                Submit
              </Button>
              Already registered ?{" "}
              <span className=" text-[#7848F4] underline">Click Here</span>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
