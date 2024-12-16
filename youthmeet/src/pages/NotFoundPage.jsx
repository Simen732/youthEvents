import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-9xl font-oranienbaum text-orange-500 mb-4">404</h1>
        <h2 className="text-4xl font-poppins text-gray-700 mb-8">Page Not Found</h2>
        <p className="text-xl font-lato text-gray-600 mb-12">Oops! The page you're looking for doesn't exist.</p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="/"
            className=" inline-block bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-poppins shadow-lg transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Go Home
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg className="w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="#4CAF50" 
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.1,-0.5C88.2,15.3,83.8,30.6,75.6,43.9C67.4,57.1,55.4,68.3,41.4,76.6C27.4,84.9,13.7,90.4,-0.9,91.9C-15.5,93.4,-31,91,-45.4,84.1C-59.8,77.2,-73,65.8,-81.9,51.4C-90.8,37,-95.4,18.5,-94.7,0.4C-94,-17.7,-88,-35.4,-78.4,-50.7C-68.8,-66,-55.5,-78.9,-40.9,-85.7C-26.3,-92.5,-13.1,-93.2,1.3,-95.4C15.7,-97.6,31.5,-101.3,44.7,-76.4Z" 
            transform="translate(100 100)" 
          />
        </svg>
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span className="text-7xl">🕵️</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
