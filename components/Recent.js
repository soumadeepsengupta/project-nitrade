'use client';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const items = [
  {
    name: "Bottle",
    price: "50",
    image: "/Chinnari.jpeg",
    alt: "Water bottle with blue color"
  },
  {
    name: "Sports Shoe",
    price: "2,000",
    image: "/bg.jpg",
    alt: "Blue and pink sports shoes"
  },
  {
    name: "Ladies Cycle",
    price: "5,500",
    image: "/bg2.jpg",
    alt: "Light blue ladies bicycle with basket"
  },
  {
    name: "Macbook Air",
    price: "90,000",
    image: "/Abir.jpeg",
    alt: "Silver Macbook Air laptop"
  },
  {
    name: "Realme Buds",
    price: "1,500",
    image: "/profile pic.jpg",
    alt: "White Realme wireless earbuds",
    isBargain: true
  },
  {
    name: "Wi-Fi Router",
    price: "2,000",
    image: "/Soumadeep.jpeg",
    alt: "Black Wi-Fi router with antennas"
  }
];

const Recent = () => {
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

      <h2 className="text-9xl md:text-5xl font-bold tracking-[-4] text-blu m-12">
        based on your recent searches.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 rounded-lg">
        {items.map((item, index) => (
          <div
            key={item.name}
            className="bg-cream rounded-2xl hover:transition relative"
          >
            <div className="relative group">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full aspect-[4/3] object-cover rounded-2xl"
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
            <div className="p-4">
              <h3 className="font-medium text-lg text-black">{item.name}</h3>
              <p className="font-bold font-satoshi text-blu">₹ {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-8 ">
        <button
          className="font-semibold w-full mx-auto py-4 border-2 border-blu/50 rounded-full bg-white text-blu hover:bg-cream/70 transition-all duration-300 text-lg font-satoshi"
          aria-label="Load more items"
        >
          load more <span className="text-xl align-top font-semibold">+</span>
        </button>
      </div>
    </section>
  );
};

export default Recent;