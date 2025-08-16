//               SELL
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Search Section */}
//       <div className="max-w-4xl mx-auto px-4 pt-8">
//         <div className="bg-gray-800 rounded-lg p-6">
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="What are you looking for today..."
//               className="w-full bg-cream-100 text-black rounded-full py-3 px-10"
//             />
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
//             <Mic className="absolute right-3 top-3 w-5 h-5 text-blue-600" />
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//             {[
//               "Recently Bought",
//               "Daily Essentials",
//               "Popular Items",
//               "New Arrivals",
//             ].map((item, index) => (
//               <button
//                 key={index}
//                 className="bg-cream-100 text-black rounded-lg py-2 px-4 text-sm flex items-center justify-between"
//               >
//                 {item}
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//             ))}
//             <button className="bg-blue-600 text-white rounded-lg py-2 px-4 text-sm">
//               More
//             </button>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap gap-2 justify-center my-6">
//           {[
//             "ESSENTIALS",
//             "FURNITURE",
//             "ELECTRONICS",
//             "CLOTHING",
//             "SPORTS",
//             "STUDY",
//             "HEALTH",
//           ].map((category) => (
//             <button
//               key={category}
//               className="bg-white text-blue-600 rounded-full px-4 py-1 text-sm hover:bg-blue-100"
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Hero Section */}
//         <div className="text-center py-16">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Buy. Sell. Swap.
//           </h1>
//           <p className="text-2xl md:text-4xl italic mb-6">
//             Simplify Your Campus Life!
//           </p>
//           <p className="text-xl mb-8">
//             FIND WHAT YOU NEED, SELL WHAT YOU DON'T!
//           </p>
//           <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
"use client";

import React from "react";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  Mic,
  Menu,
} from "lucide-react";
import CategoryButtons from "./CategoryButtons";

const menuItems = ["Home", "Home", "Home", "Home"];

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // TODO: Implement your actual search logic here
    // This is a placeholder that simulates searching
    console.log('Searching for:', query);
    // You would typically make an API call here to your backend
    // setSearchResults(results);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      // Set a timer to stop after 5 seconds
      const timer = setTimeout(() => {
        recognition.stop();
      }, 5000);

      recognition.onstart = () => {
        setIsListening(true);
        setSearchText(''); // Clear previous search when starting new voice input
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setSearchText(transcript);
        
        // Perform search as user speaks
        if (event.results[0].isFinal) {
          handleSearch(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        clearTimeout(timer); // Clear timer on error
      };

      recognition.onend = () => {
        setIsListening(false);
        clearTimeout(timer); // Clear timer when recognition ends
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-cream relative flex flex-col">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-[url('/bg2.jpg')] bg-cover bg-blend-darken opacity-50 bg-no-repeat"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content (with relative positioning to appear above background) */}
      <div className="relative z-10 flex-grow flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 lg:px-8 backdrop-blur-md bg-black/30 z-50">
          <div className="flex items-center space-x-2">
            <img
              src="/logo-nitrade.svg"
              alt="TradeBin NITR"
              className="h-6 md:h-7"
            />
            <button className="hidden md:block px-3 py-1 text-sm"></button>
          </div>

          <div className="hidden lg:flex space-x-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="hover:text-blu font-satoshi text-xl text-cream"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4 gap-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blu text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </div>
            {/* <Heart className="w-6 h-6" /> */}
            <button className="bg-transparent border border-blu px-4 py-1 rounded-xl hover:bg-cream hover:text-[#0D00FF]">
              Login
            </button>
            <div className="flex space-x-2">
              <button className="px-4 py-1 rounded bg-blu text-cream">
                BUY
              </button>
              <button className="bg-transparent border border-cream px-4 py-1 rounded">
                SELL
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute right-0 top-16 w-64 bg-black border border-gray-700 rounded-lg shadow-lg p-4 z-10">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded text-[] font-satoshi"
              >
                {item}
              </button>
            ))}
            <hr className="my-2 border-gray-700" />
            <div className="space-y-2">
              <div className="flex items-center justify-between px-4 py-2">
                <ShoppingCart className="w-6 h-6" />
                <span className="bg-blu text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </div>
              <button className="w-full px-4 py-2 hover:bg-gray-800 rounded flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                Wishlist
              </button>
              <button className="w-full bg-transparent border border-blu px-4 py-1 rounded-xl mt-2">
                Login
              </button>
              <div className="flex flex-col space-y-2 mt-2">
                <button className="w-full bg-blu px-4 py-1 rounded bg-[]">
                  BUY
                </button>
                <button className="w-full bg-transparent border border-white px-4 py-1 rounded">
                  SELL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="max-w-4xl mx-auto py-24 flex-grow flex flex-col justify-center items-center">
          <div
            className="w-full rounded-xl p-6 border-cream border-2"
            style={{
              backgroundImage: "url('/Frame 36768 (2).png')",
            }}
          >
            <div className="relative mb-4">
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="What are you looking for today..."
                className="w-full bg-cream-100 text-black rounded-full py-3 px-10"
              />
              <Search className="absolute left-3 top-3 w-5 h-5 text-blu" />
              <button
                onClick={startListening}
                className="flex absolute right-3 top-2 focus:outline-none"
                title={isListening ? "Tap to stop" : "Tap to speak"}
              >
                <Mic className={`w-8 h-8 p-1  ${isListening ? 'bg-blu rounded-xl text-white border animate-pulse' : 'text-blu'} transition-colors duration-200`} />
              </button>
            </div>

            <CategoryButtons />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-4 py-2 justify-center my-6">
            {[
              "ESSENTIALS",
              "FURNITURE",
              "ELECTRONICS",
              "CLOTHING",
              "SPORTS",
              "STUDY",
              "HEALTH",
            ].map((category) => (
              <button
                key={category}
                className="  bg-cream backdrop-blur-sm text-blu rounded-full px-4 py-3 text-sm hover:bg-blu font-helvetica hover:text-cream  hidden md:block"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Hero Section */}
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-cream font-helvetica">
              Buy. Sell. Swap.
            </h1>
            <p className="text-2xl md:text-4xl font-satoshi mb-6 text-cream">
              Simplify Your Campus Life!
            </p>
            <p className="text-xl mb-8 text-cream italic">
              FIND WHAT YOU NEED, SELL WHAT YOU DON'T!
            </p>
            <button className="bg-blu text-lg font-semibold text-cream font-satoshi px-6 py-3 rounded-lg hover:bg-cream hover:text-blu transition-colors duration-200">
              Start selling
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Arrow */}
      <div className="absolute bottom-8 left-0 right-0">
        <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-cream" />
      </div>
    </div>
  );
};

export default Hero;
