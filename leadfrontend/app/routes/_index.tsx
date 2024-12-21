import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Search, ChevronRight } from 'lucide-react';
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Leads Viewer - 65K+ Leads at Your Fingertips" },
    { name: "description", content: "Access over 65,000 high-quality leads to grow your business. Start capturing and nurturing valuable opportunities today." },
  ];
};

export const loader = () => {
  console.log('hello')
  return null
}

export default function Index() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 w-screen to-white flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <motion.img
            src="/banner.jpg"
            alt="Leads Viewer Banner"
            className="w-full sm:w-1/3 h-auto rounded-xl object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="space-y-4">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-gray-800"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-blue-600">65K+</span> LEADS
            </motion.h1>
            <motion.p
              className="text-gray-600 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Unlock a world of opportunities with our extensive database of high-quality leads. Start growing your business today!
            </motion.p>
          </div>
        </div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Find Your Perfect Leads</h2>
          <div className="flex gap-2">
            <Input type="text" placeholder="Search by industry, location, or job title" className="flex-grow" />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {['Tech', 'Finance', 'Healthcare'].map((industry) => (
            <Button key={industry} variant="outline" className="justify-between">
              {industry} <ChevronRight className="h-4 w-4" />
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="bg-blue-50 rounded-xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Ready to skyrocket your conversions?</h3>
          <p className="text-blue-600 mb-4">Start your free trial today and access our full database of 65,000+ leads!</p>
          <Button onClick={() => navigate('/login')} size="lg">Login to Get Access</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

