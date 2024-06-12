//@ts-nocheck
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  key: string; // Add a key prop to identify unique pages
};

const pageVariants = {
  initial: { opacity: 0, scale: 0.97 }, // Add scale property
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.97 }, // Add scale property
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.8, // Adjust duration to your preference
};

const Main = (props: IMainProps) => (
  <div className="w-full min-h-screen overflow-y-scroll">
    {props.meta}

    {props.children}
  </div>
);

export { Main };
