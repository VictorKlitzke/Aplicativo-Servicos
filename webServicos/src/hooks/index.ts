import { useEffect } from "react";

export default function usePreventBack() {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href); 
    };
  }, []);
}