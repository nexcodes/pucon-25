import { Trees, TreesIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "../../_components/sign-up-form";
export const metadata: Metadata = {
  title: "Sign Up | EcoMate",
  description: "Create a new EcoMate account",
};

export default function SignUpPage() {
  return (
    <div className="relative flex-col items-center justify-center min-h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left side with gradient background and quote */}
      <div className="relative flex-col hidden h-full p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-900" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[100px] opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-400/20 rounded-full filter blur-[80px] opacity-40"></div>

        {/* Logo */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-700 p-1.5 rounded-full mr-2 shadow-lg border border-blue-600/30">
              <Trees
                size={24}
                className="text-gray-900 filter drop-shadow-sm"
              />
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent font-bold text-xl tracking-wide drop-shadow-md">
              EcoMate
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-blue-100">
            {`"Joining this platform was effortless. It's revolutionized how we
              track our carbon footprint and collaborate with our community to
              achieve sustainability goals."`}
            </p>
            <footer className="text-sm text-indigo-300">
              Liam Carter, Environmental Advocate
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right side with sign-up form */}
      <div className="lg:p-8 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              Create an account
            </h1>
            <p className="text-sm text-gray-400">
              Enter your information below to create your account
            </p>
          </div>

          <SignUpForm />

          <div className="text-center">
            <p className="text-sm text-gray-400">
              {"Already have an account? "}
              <Link
                href="/auth/sign-in"
                className="font-medium text-blue-400 hover:text-indigo-300 hover:underline transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile logo for small screens */}
      <div className="absolute top-4 left-4 lg:hidden flex items-center">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-700 p-1.5 rounded-full mr-2 shadow-lg border border-blue-600/30">
          <TreesIcon size={18} className="text-white filter drop-shadow-sm" />
        </div>
        <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent font-bold text-lg tracking-wide drop-shadow-md">
          EcoMate
        </span>
      </div>
    </div>
  );
}
