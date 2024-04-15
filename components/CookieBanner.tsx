// CookieBanner.tsx
import React from "react";
import styles from "./CookieBanner.module.css"; // Assuming you're using CSS modules

const CookieBanner: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white p-5 rounded-xl shadow-sm z-50">
      <h2>Cookies on Our Site</h2>
      <p>
        We use cookies to improve your browsing experience. By using our site,
        you agree to our use of cookies.
      </p>
      {/* Add more information about your cookies here */}
    </div>
  );
};

export default CookieBanner;
