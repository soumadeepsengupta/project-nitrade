'use client';
import { Heart, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const bestsellers = [
  {
    id: 1,
    name: "Casual Shoe",
    price: "1000",
    image: "/bg.jpg",
    alt: "Black Nike casual shoe"
  },
  {
    id: 2,
    name: "Casual Shoe",
    price: "1000",
    image: "/bg2.jpg",
    alt: "Black Nike casual shoe"
  },
  {
    id: 3,
    name: "Casual Shoe",
    price: "1000",
    image: "/bg.jpg",
    alt: "Black Nike casual shoe"
  },
  {
    id: 4,
    name: "Casual Shoe",
    price: "1000",
    image: "/bg2.jpg",
    alt: "Black Nike casual shoe"
  },
  {
    id: 5,
    name: "Casual Shoe",
    price: "1000",
    image: "/bg.jpg",
    alt: "Black Nike Air Force 1 sneaker"
  },
  {
    id: 6,
    name: "Casual Shoe",
    price: "1000",
    image: "/bg.jpg",
    alt: "Black Nike Air Force 1 sneaker"
  },
  {
    id: 7,
    name: "Macbook Air",
    price: "90,000",
    image: "/Abir.jpeg",
    alt: "Silver Macbook Air laptop"
  },
  {
    id: 8,
    name: "Realme Buds",
    price: "1,500",
    image: "/profile pic.jpg",
    alt: "White Realme wireless earbuds",
    isBargain: true
  },
  {
    id: 9,
    name: "Wi-Fi Router",
    price: "2,000",
    image: "/Soumadeep.jpeg",
    alt: "Black Wi-Fi router with antennas"
  }
];

const Best = () => {
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState({ show: false, itemName: '' });

  const toggleWishlist = (itemName) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(itemName);
      const newWishlist = isInWishlist 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName];
      
      // Show notification
      setNotification({
        show: true,
        itemName,
        adding: !isInWishlist
      });
      
      // Hide notification after 2 seconds
      setTimeout(() => {
        setNotification({ show: false, itemName: '' });
      }, 2000);

      return newWishlist;
    });
  };

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-blu px-4 py-2 rounded-lg shadow-lg text-sm transition-opacity z-50">
          {notification.adding ? `Added ${notification.itemName} to Wishlist` : `Removed ${notification.itemName} from Wishlist`}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-9xl md:text-5xl font-bold tracking-[-2] text-blu mt-6 mb-6">
          bestseller
        </h2>
      </div>

      <div className="flex overflow-x-auto gap-6 mb-8 pb-4 hide-scrollbar">
        {/* Regular product cards */}
        {bestsellers.map((item, index) => (
          <div
            key={item.id}
            className="bg-cream rounded-2xl hover:transition relative w-[300px] h-[400px] flex-shrink-0"
          >
            <div className="relative group h-[300px]">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              {/* Heart button - hidden by default, shown on hover */}
              <button
                aria-label={`${wishlist.includes(item.name) ? 'Remove from' : 'Add to'} wishlist`}
                onClick={() => toggleWishlist(item.name)}
                className={`font-satoshi absolute top-5 right-5 p-2 backdrop-blur rounded-full border transition-all opacity-0 group-hover:opacity-100
                  ${wishlist.includes(item.name)
                    ? 'bg-blu border-blu text-white hover:bg-blu/80'
                    : 'bg-white/70 border-gray-300 hover:border-blu hover:bg-white/90'
                  }`}
              >
                <Heart className={`w-4 h-4 stroke-black/40 ${wishlist.includes(item.name) ? 'fill-current' : ''}`} />
              </button>
              {/* Add to Cart button - shown on hover */}
              <button 
                className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur-sm rounded-full font-satoshi text-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blu hover:text-white flex items-center justify-center gap-2"
                aria-label={`Add ${item.name} to cart`}
              >
                + Add To Cart
              </button>
              {item.isBargain && (
                <button className="absolute top-3 left-3 text-lg font-satoshi font-medium px-2 py-1 rounded-full bg-blu text-white hover:bg-blu/90 transition hover:border-2">
                  ₹ Bargain
                </button>
              )}
            </div>
            <div className="p-4 h-[100px] flex flex-col justify-center">
              <h3 className="font-medium text-lg text-black truncate">{item.name}</h3>
              <p className="font-bold font-satoshi text-blu">₹ {item.price}</p>
            </div>
          </div>
        ))}
        
        {/* More+ card */}
        <div className="group w-[300px] h-[300px] flex-shrink-0 rounded-2xl bg-blu hover:bg-white hover:border-2 hover:border-blu cursor-pointer transition-all duration-300 relative p-6">
          <span className="absolute top-4 right-4 text-white text-5xl font-bold transition-colors group-hover:text-blu">+</span>
          <div className="h-full flex items-center justify-center">
            <p className="text-4xl font-satoshi font-bold text-white transition-colors group-hover:text-blu">more</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Best;