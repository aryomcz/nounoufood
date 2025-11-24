import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Button, Group, Badge, Stack } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import classes from "../../../css/Hero.module.css"
import { useTranslation } from "react-i18next";
import {motion} from "motion/react";


export default function Toko({toko}) {
  const {t} = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <div id="toko" className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10">
      <div className="text-center flex flex-col gap-2">
      <motion.h1 initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          type: "spring",
          bounce: 0.45,
          stiffness: 70,
          damping: 12,
        }} className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10">{t('toko_title')}</motion.h1>
      <motion.p  initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          type: "spring",
          bounce: 0.45,
          stiffness: 70,
          damping: 12,
        }} className="font-poppins text-sm lg:text-lg capitalize">{t('toko_subtitle')} </motion.p>
      </div>
      <Carousel
        slideSize="256px"
        w={"100%"}
        height="auto"
        slideGap="md"
        align="center"
        classNames={classes}
        slidesToScroll={4}
        withIndicators
        withControls={false}
        loop
        plugins={[autoplay.current]}
        emblaOptions={{ align: 'center'}}
        // styles={{ container: {justifyContent:"center"} }}
      >
        {toko?.map((p) => (
            <Carousel.Slide key={p.id} className="py-10">
              <Card
                shadow="xl"
                padding="lg"
                radius="lg"
                h="360px" 
                w="100%" 
                maw="256px"
                ta="start"
                withBorder
                style={{ borderRadius: "20px", position: "relative" }}
              >
                <Card.Section>
                  <iframe src={p.url_map_embed} className="w-full h-[140px]" ></iframe>
                  </Card.Section>

                  <Stack h={"100%"} justify="space-between">
                  <div className="flex flex-col gap-2">
                <Text fw={600} mt="md" size="md">
                  {p.nama}
                </Text>
                <div className="grid grid-cols-8">
                    <Icon icon="akar-icons:location" width={20} height={20}/>
                    <Text fw={600} size="xs" className="col-span-6">
                        {p.alamat}
                    </Text>
                </div>
                </div>
                <Button
                    color="#D0A45E"
                    rightSection={<Icon icon="tabler:arrow-right" width={20} />}
                    radius="lg"
                    fullWidth
                    component="a"
                    href={p.url_map}
                  >
                    {t('button_kunjungi')}
                  </Button>
                </Stack>
                {/* NAMA PRODUK */}
              </Card>
            </Carousel.Slide>
          ))}
      </Carousel>
    </div>
  )
}
