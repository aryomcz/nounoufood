import { Accordion } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

export default function FAQ({ faq }) {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.45,
        stiffness: 70,
        damping: 12,
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10">
      {/* Judul */}
      <div className="text-center flex flex-col gap-2 px-1">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            type: "spring",
            bounce: 0.45,
            stiffness: 70,
            damping: 12,
          }}
          className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10"
        >
          FAQ
        </motion.h1>

        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            type: "spring",
            bounce: 0.45,
            stiffness: 70,
            damping: 12,
          }}
          className="font-poppins text-sm lg:text-lg capitalize"
        >
          {t("faq_subtitle")}
        </motion.p>
      </div>

      {/* STAGGER WRAPPER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="w-full"
      >
        <Accordion
          variant="contained"
          radius="xs"
          w="100%"
          color="#feefd5"
          styles={{
            control: {
              backgroundColor: "transparent",
              border: "black",
              "&:hover": { backgroundColor: "transparent" },
            },
            item: { backgroundColor: "transparent" },
          }}
        >
          {faq?.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Accordion.Item value={item.pertanyaan}>
                <Accordion.Control>{item.pertanyaan}</Accordion.Control>
                <Accordion.Panel>{item.jawaban}</Accordion.Panel>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
