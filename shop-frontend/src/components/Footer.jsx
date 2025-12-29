import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-white">

      {/* Back to top */}
      <div className="bg-linear-to-r from-teal-600 to-cyan-600 py-4 text-center">
        <a className="text-white font-medium hover:underline cursor-pointer">Back to top</a>
      </div>

      {/* Main Footer */}
      <div className="bg-linear-to-br from-teal-700 via-teal-800 to-cyan-900 py-12 px-6 md:px-16 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Column 1 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Get to Know Us</h4>
            <ul className="space-y-1">
              <li><a className="hover:underline">About ShopCircle</a></li>
              <li><a className="hover:underline">Careers</a></li>
              <li><a className="hover:underline">Press Releases</a></li>
              <li><a className="hover:underline">Shop Science</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Connect with Us</h4>
            <ul className="space-y-1">
              <li><a className="hover:underline">Facebook</a></li>
              <li><a className="hover:underline">Twitter</a></li>
              <li><a className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Make Money with Us</h4>
            <ul className="space-y-1">
              <li><a className="hover:underline">Sell on ShopCircle</a></li>
              <li><a className="hover:underline">Sell under ShopCircle Accelerator</a></li>
              <li><a className="hover:underline">Protect and Build Your Brand</a></li>
              <li><a className="hover:underline">ShopCircle Global Selling</a></li>
              <li><a className="hover:underline">Supply to ShopCircle</a></li>
              <li><a className="hover:underline">Become an Affiliate</a></li>
              <li><a className="hover:underline">Fulfilment by ShopCircle</a></li>
              <li><a className="hover:underline">Advertise Your Products</a></li>
              <li><a className="hover:underline">ShopCircle Pay on Merchants</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Let Us Help You</h4>
            <ul className="space-y-1">
              <li><a className="hover:underline">Your Account</a></li>
              <li><a className="hover:underline">Returns Centre</a></li>
              <li><a className="hover:underline">Recalls and Product Safety Alerts</a></li>
              <li><a className="hover:underline">100% Purchase Protection</a></li>
              <li><a className="hover:underline">ShopCircle App Download</a></li>
              <li><a className="hover:underline">Help</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-teal-300 bg-teal-900 py-6 flex flex-col md:flex-row items-center justify-center gap-6">

        {/* Logo */}
        <img
          src="/amazon-logo.png"
          className="w-24 opacity-90"
          alt="ShopCircle Logo"
        />

        {/* Language / Country */}
        <div className="flex gap-4">
          <select className="bg-teal-800 border border-teal-300 px-3 py-2 rounded text-white">
            <option>English</option>
          </select>

          <select className="bg-teal-800 border border-teal-300 px-3 py-2 rounded text-white">
            <option>India</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
