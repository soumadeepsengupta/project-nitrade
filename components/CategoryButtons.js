import React from "react";
import { ArrowUpRight, PlusIcon } from "lucide-react";

const CategoryButtons = () => {
  const categories = ["Recently Bought", "Popular Items", "New Arrivals"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((item, index) => (
        <button
          key={index}
          className="relative bg-[#F5F5DC] text-black font-satoshi font-medium rounded-xl p-6 border-2 border-[#0D00FF] font-normal hover:bg-[#0D00FF] hover:text-[#F5F5DC] group"
        >
          <div className="flex flex-col items-start">
            {/* Split text into multiple lines */}
            {item.split(" ").map((word, i) => (
              <span key={i} className="text-xl">
                {word}
              </span>
            ))}
          </div>
          {/* Top-right arrow */}
          <ArrowUpRight className="w-5 h-5 absolute top-4 right-4" />
        </button>
      ))}

      {/* More button */}

      <button className="bg-[#2A51FF] font-satoshi text-[#F5F5DC] relative rounded-xl p-6 text-xl font-semibold hover:bg-[#F5F5DC] hover:text-[#0D00FF]">
        <div>More</div>
        <PlusIcon className="w-5 h-5 absolute top-4 right-4" />
      </button>
    </div>
  );
};

export default CategoryButtons;
