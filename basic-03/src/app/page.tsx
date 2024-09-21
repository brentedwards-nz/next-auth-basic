"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="w-full md:w-1/2 p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Bowls Manager
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus
          mauris ut magna interdum, nec elementum lacus fermentum. Curabitur
          efficitur lectus id mi aliquet, non tincidunt velit lacinia.
        </p>
        <Button
          onClick={() => router.push("/manager")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Button>
      </div>
      <div className="w-full md:w-1/2 h-auto md:h-screen bg-red-900">
        <img
          src="/images/bowls.jpg"
          alt="Placeholder Image"
          className="w-full object-cover h-full"
        />
      </div>
    </div>
  );
}
