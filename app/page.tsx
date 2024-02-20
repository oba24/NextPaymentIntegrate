"use client";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import axios from 'axios';

const formSchema = z.object({
  name: z.string(),
  emailAddress: z.string().email(),
  phoneNumber: z.string(),
  productName: z.string(),
  quantity: z.number(),
  price: z.string(),

  paymenttype: z.enum(["Knet", "Visa", "COD"], {
    required_error: "You need to select a Payment method."
  }),
})


export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      productName: "",
      quantity: 1,
      price: 0,
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    const token = 'rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL'; // Replace with your actual token value
    const baseURL = 'https://apitest.myfatoorah.com'; // The base URL of your proxy server
    var total_price = values.price * values.quantity;
    console.log(total_price,'====');
    const options = {
        NotificationOption: "Lnk",
        CustomerName: values.name,
        DisplayCurrencyIso: 'KWD',
        MobileCountryCode: '+965',
        CustomerMobile: values.phoneNumber,
        CustomerEmail: values.emailAddress,
        InvoiceValue: total_price,
        CallBackUrl: 'http://localhost:3000/paymentStatus',
        ErrorUrl: 'http://localhost:3000/paymentStatus',
        Language: 'en',
        InvoiceItems: [{
          ItemName: values.productName,
          Quantity: values.quantity,
          UnitPrice: values.price
        }]
    };


    axios.post('/api/sendPayment', {
      data: options
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (res.status == 201)
      {
        var InvoiceURL = res.data.data.Data.InvoiceURL;
        window.location.replace(InvoiceURL)
      }
    })


  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-[50px] p-24">
      <h1 className='font-bold text-2xl'>Payment Form Example</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>

          <FormField control={form.control} name="name" render={({ field }) => {
            return <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />

          <FormField control={form.control} name="emailAddress" render={({ field }) => {
            return <FormItem>
              <FormLabel>Email Address:</FormLabel>
              <FormControl>
                <Input
                  placeholder='Email address'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />

          <FormField control={form.control} name="phoneNumber" render={({ field }) => {
            return <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder='Phone Number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
          <FormField control={form.control} name="productName" render={({ field }) => {
            return <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Product Name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
          <FormField control={form.control} name="quantity" render={({ field }) => {
            return <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder='Name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
          <FormField control={form.control} name="price" render={({ field }) => {
            return <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder='Price'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />

          <FormField
            control={form.control}
            name="paymenttype"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select payment method:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Knet" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Knet
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Visa" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Visa
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="COD" />
                      </FormControl>
                      <FormLabel className="font-normal">COD</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
