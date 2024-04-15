"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Close } from "@mui/icons-material";

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cookieBannerClosed = localStorage.getItem("cookieBannerClosed");
    if (cookieBannerClosed === "true") {
      setIsVisible(false);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    localStorage.setItem("cookieBannerClosed", "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-stone-700 p-5 rounded-xl shadow-m z-50 text-white">
      <div className="flex justify-between">
        <h2 className="py-2 ">Cookies on Our Site</h2>
        <Button className="bg-transparent" onClick={closeBanner}>
          <Close />
        </Button>
      </div>
      <p>
        We use cookies to improve your browsing experience. By using our site,
        you agree to our use of cookies.
      </p>
    </div>
  );
};

export default CookieBanner;
