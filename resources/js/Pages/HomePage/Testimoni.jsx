import { Carousel } from "@mantine/carousel";
import { Card, Text, Group, Avatar, Rating } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import classes from "../../../css/Hero.module.css"

export default function Testimoni({ testi }) {
  const {t} = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <div className="w-full flex flex-col justify-center items-center py-14">
       <div className="text-center flex flex-col gap-2 px-1 mb-10">
      <h1 className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10">{t('testimoni_title')}</h1>
      <p className="font-poppins text-sm lg:text-lg capitalize">{t('testimoni_subtitle')}</p>
      </div>

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
        emblaOptions={{ align: 'center'}}
        // styles={{ container: {justifyContent:"center"} }}
        
      >
        {testi?.map((item, i) => (
          <Carousel.Slide key={i} className="py-10">
            <Card
              shadow="md"
              h="240px" w="100%" maw="300px"
              mih={200}
              mb="sm"
              withBorder
              padding="lg"
              radius="lg"
              className="bg-[#F8B94C] text-black text-start"
            >
              {/* Icon Quote */}
              <Icon
                icon="mingcute:quote-right-fill"
                width={40}
                className="text-gray-700"
              />

              {/* Komentar */}
              <Text mt="sm" mb="md" className="font-poppins">
                {item.komentar}
              </Text>

                {/* Bintang */}
             <Rating value={item.bintang} readOnly mb="sm" />

              {/* Avatar + Nama + Role */}
              <Group>
                <Avatar
                  radius="xl"
                  color="orange"
                  size="md"
                >
                  {item.nama.slice(0, 2).toUpperCase()}
                </Avatar>

                <div>
                  <Text fw={600}>{item.nama}</Text>
                  <Text size="xs" c="dimmed">Customer</Text>
                </div>
              </Group>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
