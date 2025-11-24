import { Carousel } from "@mantine/carousel";
import { Card, Text, Group, Avatar, Rating } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import classes from "../../../css/Hero.module.css"
import { motion } from "motion/react";

// === Stagger Variants ===
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
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

export default function Testimoni({ testi }) {
  const { t } = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <div className="w-full flex flex-col justify-center items-center py-14">
      <div className="text-center flex flex-col gap-2 px-1 mb-10">

        {/* Title */}
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ type: "spring", bounce: 0.45, stiffness: 70, damping: 12 }}
          className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10"
        >
          {t("testimoni_title")}
        </motion.h1>

        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ type: "spring", bounce: 0.45, stiffness: 70, damping: 12 }}
          className="font-poppins text-sm lg:text-lg capitalize"
        >
          {t("testimoni_subtitle")}
        </motion.p>

      </div>

      {/* === STAGGER PARENT === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="w-full"
      >
        <Carousel
          slideSize={"300px"}
          slideGap="md"
          w="100%"
          height="auto"
          align="center"
          loop
          classNames={classes}
          withControls={false}
          withIndicators={true}
          plugins={[autoplay.current]}
          emblaOptions={{ align: "center" }}
        >
          {testi?.map((item, i) => (
            <Carousel.Slide key={i} className="py-10">

              {/* === STAGGER CHILD === */}
              <motion.div variants={itemVariants}>
                <Card
                  shadow="md"
                  h="240px"
                  w="100%"
                  maw="300px"
                  mih={200}
                  mb="sm"
                  withBorder
                  padding="lg"
                  radius="lg"
                  className="bg-[#F8B94C] text-black text-start"
                >
                  <Icon
                    icon="mingcute:quote-right-fill"
                    width={40}
                    className="text-gray-700"
                  />

                  <Text mt="sm" mb="md" className="font-poppins">
                    {item.komentar}
                  </Text>

                  <Rating value={item.bintang} readOnly mb="sm" />

                  <Group>
                    <Avatar radius="xl" color="orange" size="md">
                      {item.nama.slice(0, 2).toUpperCase()}
                    </Avatar>

                    <div>
                      <Text fw={600}>{item.nama}</Text>
                      <Text size="xs" c="dimmed">Customer</Text>
                    </div>
                  </Group>

                </Card>
              </motion.div>

            </Carousel.Slide>
          ))}
        </Carousel>
      </motion.div>

    </div>
  );
}
