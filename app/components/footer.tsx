// components/Footer.js

export default function Footer(){
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <p>Follow us on social media: 
            <a href="#" className="text-blue-400 hover:underline"> Twitter</a>, 
            <a href="#" className="text-blue-400 hover:underline"> Facebook</a>, 
            <a href="#" className="text-blue-400 hover:underline"> Instagram</a>
          </p>
        </div>
      </footer>
    );
  };
  
  
  