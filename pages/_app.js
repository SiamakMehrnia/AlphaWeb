import "@/styles/globals.css"; // مسیر صحیح فایل استایل
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar"; // افزودن Navbar

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // برای اطمینان از رندر صحیح Tailwind
    document.body.classList.add("bg-black", "text-white");
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  );
}