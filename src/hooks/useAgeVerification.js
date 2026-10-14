import { useState } from "react";

const STORAGE_KEY = "anomia-age-verified";

const readStoredVerification = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const persistVerification = () => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    return true;
  } catch {
    return false;
  }
};

export const useAgeVerification = () => {
  const [isVerified, setIsVerified] = useState(readStoredVerification);

  const confirmAge = (isAdult) => {
    if (!isAdult) {
      window.location.href = "https://www.google.com";
      return;
    }

    persistVerification();
    setIsVerified(true);
  };

  return { isVerified, confirmAge };
};
