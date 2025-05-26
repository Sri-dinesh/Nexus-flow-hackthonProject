/* eslint-disable no-useless-escape */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    const formData = new FormData();
    const apiKey = import.meta.env.VITE_WEB3FORMS_API_KEY || "MISSING_API_KEY";

    if (apiKey === "MISSING_API_KEY") {
      console.error("API key is missing!");
      toast({
        title: "Error",
        description: "Form API key is missing. Please set it in .env.local.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    formData.append("apikey", apiKey);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit ", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-slate-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Have questions or need assistance? We're here to help you with your
            real estate journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Our team of real estate experts is ready to assist you with any
              questions or concerns. Feel free to reach out through any of the
              following channels:
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Office Location
                  </h3>
                  <address className="not-italic text-muted-foreground">
                    123 Real Estate Boulevard
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">
                    General Inquiries:{" "}
                    <a
                      href="mailto:info@estatenexus.com"
                      className="text-primary hover:underline">
                      info@estatenexus.com
                    </a>
                    <br />
                    Support:{" "}
                    <a
                      href="mailto:support@estatenexus.com"
                      className="text-primary hover:underline">
                      support@estatenexus.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground">
                    Main Office:{" "}
                    <a
                      href="tel:+12345678900"
                      className="text-primary hover:underline">
                      +1 (234) 567-8900
                    </a>
                    <br />
                    Customer Service:{" "}
                    <a
                      href="tel:+12345678901"
                      className="text-primary hover:underline">
                      +1 (234) 567-8901
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
              <ul className="text-muted-foreground">
                <li className="flex justify-between py-2 border-b">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </li>
                <li className="flex justify-between py-2 border-b">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  rules={{
                    pattern: {
                      value: /^[0-9\+\-\(\) ]+$/,
                      message: "Invalid phone number",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(123) 456-7890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  rules={{ required: "Subject is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="How can we help you?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3542953603196!2d-74.00224892346311!3d40.75423163502833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b3eaaaaaab%3A0x94340d8f4fe2aae5!2sWest%20123%20LLC!5e0!3m2!1sen!2sin!4v1748196632833!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"></iframe>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Terminal Velocity</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property across the
                United States.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/properties"
                    className="text-gray-400 hover:text-white">
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    href="/agents"
                    className="text-gray-400 hover:text-white">
                    Agents
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Market Trends
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Buying Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Selling Tips
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <address className="text-gray-400 not-italic">
                123 Real Estate Blvd
                <br />
                New York, NY 10001
                <br />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white">
                  +1 (234) 567-890
                </a>
                <br />
                <a
                  href="mailto:info@estatenexus.com"
                  className="hover:text-white">
                  info@estatenexus.com
                </a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} EstateNexus. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
