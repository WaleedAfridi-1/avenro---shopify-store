import Hero from "@/components/home/Hero/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col gap-4 items-center justify-center">
      <Hero/>
      <div className="w-full min-h-screen"></div>
    </main>
  );
}
