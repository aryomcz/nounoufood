import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Button, Group, Badge, Stack } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import classes from "../../../css/Hero.module.css"

export default function Toko({toko}) {
    const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <div id="toko" className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10">
      <div className="text-center flex flex-col gap-2">
      <h1 className="font-poppins-2 font-semibold text-xl lg:text-2xl mt-10">Kunjungi Toko Offline Kami</h1>
      <p className="font-poppins text-sm lg:text-base capitalize">Tempat Kamu Bisa Mengunjungi kami </p>
      </div>
      <Carousel
        slideSize={{ base:"100%", sm:"50%", md:"38%", lg:"25%" }}
        w={{ base: '75%', sm: '75%', md: '75%' }}
        height={"auto"}
        slideGap="md"
        align="center"
        classNames={classes}
        slidesToScroll={4}
        withIndicators
        withControls={false}
        loop
        plugins={[autoplay.current]}
        emblaOptions={{ align: 'center'}}
      >
        {toko.map((p) => (
            <Carousel.Slide key={p.id} className="py-10">
              <Card
                shadow="xl"
                padding="lg"
                radius="lg"
                h="auto"
                mih="320px"
                w="100%"
                ta="start"
                withBorder
                style={{ borderRadius: "20px", position: "relative" }}
              >
                <Card.Section>
                  <iframe src={p.url_map_embed} className="w-full h-[140px]" ></iframe>
                  </Card.Section>

                  <Stack>
                  <div>
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
                    Kunjungi
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
