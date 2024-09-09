import { ReactNode, useState } from "react";
import { useTheme } from "../store/useTheme";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

import StepCard from "../components/items/StepCard";

import HomeImage from "../assets/images/faq-must-icense.jpg";
import HomeImageFake from "../assets/images/this-is-fine.gif";
import IconArrowRight from "../components/icons/IconArrowRight";
import IconArrowDown from "../components/icons/IconArrowDown";
import IconUploadMain from "../components/icons/IconUploadMain";
import IconAsk from "../components/icons/IconAsk";
import IconDatabase from "../components/icons/IconDatabase";

const HomeSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col items-center w-full">{children}</section>
  );
};

const HomePage = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ query: "(max-width: 639px)" });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="flex flex-col w-full h-max">
      <HomeSection>
        <div className="flex relative w-full h-full bg-white dark:bg-black justify-center">
          <AnimatePresence>
            {theme === "dark" ? (
              <motion.img
                src={HomeImageFake}
                alt="Home-fake"
                className="w-full"
                initial={{ opacity: 0, y: -30 }}
                animate={isImageLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, type: "spring" }}
                layout
                onLoad={() => setIsImageLoaded(true)}
              />
            ) : (
              <>
                <motion.img
                  src={HomeImage}
                  alt="Home"
                  className="max-h-80"
                  initial={{ opacity: 0, y: -30 }}
                  animate={isImageLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, type: "spring" }}
                  layout
                  onLoad={() => setIsImageLoaded(true)}
                />
                <motion.a
                  href="http://www.freepik.com"
                  className="absolute right-4 bottom-4 sm:right-32 sm:bottom-10 text-[9px] text-end"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Designed by pch.vector / Freepik
                </motion.a>
              </>
            )}
          </AnimatePresence>
          <motion.div
            className="absolute mt-8 sm:mt-12 px-4 py-2 bg-gray-50 bg-opacity-50 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-serif font-semibold text-xl sm:text-3xl text-stone-600 ">
              Build your own FAQ
            </h1>
          </motion.div>
        </div>
      </HomeSection>
      <HomeSection>
        <div className="flex flex-col items-center w-full mt-8 space-y-4">
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-stone-600 dark:text-stone-200">
            Just 3 Steps
          </h2>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { when: "beforeChildren", staggerChildren: 0.1 },
              },
            }}
          >
            <StepCard
              icon={
                <IconUploadMain
                  className="size-10"
                  stroke={theme === "dark" ? "#fff" : "#000"}
                />
              }
              title="Upload"
              description="Upload a question bank file in .xlsx or .csv format, containing the expected questions and correct answers."
            />
            {isMobile ? (
              <IconArrowDown className="my-4 size-8 dark:fill-white" />
            ) : (
              <IconArrowRight className="mx-4 size-8 dark:fill-white" />
            )}
            <StepCard
              icon={<IconDatabase className="size-10 dark:fill-white" />}
              title="Initialize"
              description="Start initializing the vector database, which may take 5 to 10 minutes."
            />
            {isMobile ? (
              <IconArrowDown className="my-4 size-8 dark:fill-white" />
            ) : (
              <IconArrowRight className="mx-4 size-8 dark:fill-white" />
            )}
            <StepCard
              icon={<IconAsk className="size-10 dark:fill-white" />}
              title="Ask"
              description="Once the database initialization is complete, you can start asking questions. The server will select the most appropriate answers through vector search."
            />
          </motion.div>
        </div>
      </HomeSection>
      {/* <HomeSection></HomeSection> */}
    </div>
  );
};

export default HomePage;
