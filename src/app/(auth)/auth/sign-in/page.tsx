import { Trees, TreesIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "../../_components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In | EcoMate",
  description: "Sign in to your EcoMate account",
};

export default function SignInPage() {
  return (
    <div className="relative flex-col items-center justify-center min-h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left side with gradient background and quote */}
      <div className="relative flex-col hidden h-full p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-gray-900" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full filter blur-[100px] opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/20 rounded-full filter blur-[80px] opacity-40"></div>

        {/* Logo */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-1.5 rounded-full mr-2 shadow-lg border border-green-600/30">
              <Trees
                size={24}
                className="text-gray-900 filter drop-shadow-sm"
              />
            </div>
            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-bold text-xl tracking-wide drop-shadow-md">
              EcoMate
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-green-100">
              {
                "Together, we're turning small actions into a big impact. This platform empowers our community to reduce our carbon footprint, one step at a time."
              }
            </p>
            <footer className="text-sm text-green-300">
              Emma Green, Environmental Specialist
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right side with sign-in form */}
      <div className="lg:p-8 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-400">
              Enter your email below to sign in to your account
            </p>
          </div>

          <SignInForm />

          <div className="text-center">
            <p className="text-sm text-gray-400">
              {"Don't have an account? "}
              <Link
                href="/auth/sign-up"
                className="font-medium text-green-400 hover:text-green-300 hover:underline transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile logo for small screens */}
      <div className="absolute top-4 left-4 lg:hidden flex items-center">
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-1.5 rounded-full mr-2 shadow-lg border border-green-600/30">
          <TreesIcon size={18} className="text-white filter drop-shadow-sm" />
        </div>
        <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-bold text-lg tracking-wide drop-shadow-md">
          EcoMate
        </span>
      </div>
    </div>
  );
}
