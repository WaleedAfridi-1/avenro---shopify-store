import Image from "next/image";
import React from "react";
import CategoryCard from "./CategoryCard";

const ShopByCategory = () => {
  return (
    <section className="mt-12 bg-accent-soft/80 w-full min-h-screen">
      {/* Header  */}
      <div className="w-full flex flex-col items-center  gap-3 py-6">
        <span className="text-primary text-sm font-mono tracking-[0.25em]">
          SHOP BY CATEGORY
        </span>
        <div className="w-4/5">
          <h1 className="text-foreground text-center text-xl md:text-2xl lg:text-3xl md:tracking-wider font-semibold lg:tracking-widest uppercase ">
            Explore The AVENRO Essentials.
          </h1>
        </div>
      </div>

      {/* card container   */}
      <div className="w-full flex overflow-x-auto gap-2 px-2 transition-all duration-300 ease-in-out py-6 scrollbar-none">
        {/* Card Item Wrapper */}
        <CategoryCard href="#" title="women" image="/category/womenCate2.jpg"/>
        <CategoryCard href="#" title="men" image="/category/MenCate.jpg"/>
        <CategoryCard href="#" title="accessories" image="/category/accessoriesCat.jpg"/>

      </div>
    </section>
  );
};

export default ShopByCategory;
