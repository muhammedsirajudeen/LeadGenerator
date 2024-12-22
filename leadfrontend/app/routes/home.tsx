'use client'

import { Form, useLoaderData } from "@remix-run/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { useState } from "react";
import { CompanyInfo, GetLeads } from "~/services/LeadService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { BarChart, DollarSign, Globe, Phone, ShoppingBag, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { motion } from "framer-motion"
export async function loader() {
    const data = await GetLeads(1)
    return data
}

export async function action({ request }: { request: Request }) {
    const formData = new URLSearchParams(await request.text());
    console.log(formData.get("country"))
    return null
}
export default function StyledSearchForm() {
    const CompanyData = useLoaderData() as CompanyInfo[]
    console.log(CompanyData)
    const [revenue, setRevenue] = useState([50000]);

    return (
        <>
            <div className="flex w-screen   flex-col items-center justify-start mt-20">
                {/* form that triggers the search */}
                <Form method="post" className="w-full max-w-md space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter the city"
                            name="search"
                            className="bg-white border h-12 w-full border-gray-300 rounded-full pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex w-screen items-start justify-start gap-10">
                        <Select name="country">
                            <SelectTrigger className="w-auto">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select name="city">
                            <SelectTrigger className="w-auto" >
                                <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ny">New York</SelectItem>
                                <SelectItem value="la">Los Angeles</SelectItem>
                                <SelectItem value="ch">Chicago</SelectItem>
                                <SelectItem value="ho">Houston</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="space-y-2"  >
                            <label htmlFor="revenue" className="block text-sm font-medium text-gray-700">
                                Revenue: ${revenue.toLocaleString()}
                            </label>

                            <Slider
                                name="revenue"
                                id="revenue"
                                min={0}
                                max={1000000}
                                step={10000}
                                value={revenue}
                                onValueChange={setRevenue}
                            />
                        </div>
                    </div>
                </Form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {CompanyData.map((company, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }} // Starting state
                    animate={{ opacity: 1, y: 0 }}  // Animate to this state
                    transition={{ duration: 0.5 }}  // Animation duration
                    // style={{ , padding: "20px" }}
                >
                                        <Card key={index} className="w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <CardHeader className="  p-4 rounded-t-lg">
                            <CardTitle className="text-lg font-bold">{company.company_name}</CardTitle>
                            <CardDescription className="text-sm">{company.domain}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 bg-gray-50">
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-700">
                                    <Globe className="mr-2 h-5 w-5 text-blue-500" />
                                    <span>{company.location}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Users className="mr-2 h-5 w-5 text-green-500" />
                                    <span>{company.employee_count} employees</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <ShoppingBag className="mr-2 h-5 w-5 text-yellow-500" />
                                    <span>{company.product_count} products</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Phone className="mr-2 h-5 w-5 text-red-500" />
                                    <span>{company.phone}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <DollarSign className="mr-2 h-5 w-5 text-indigo-500" />
                                    <span>{company.estimated_annual_sales}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <BarChart className="mr-2 h-5 w-5 text-purple-500" />
                                    <span>{company.estimated_visits} estimated visits</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 bg-white rounded-b-lg border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {company.technologies.split(',').map((tech, i) => (
                                    <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                                        {tech.trim()}
                                    </Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>


                ))}
            </div>
        </>
    );
}

