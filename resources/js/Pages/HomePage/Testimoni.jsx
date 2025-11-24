import { Carousel } from "@mantine/carousel";
import { Card, Text, Group, Avatar, Rating } from "@mantine/core";
import { Icon } from "@iconify/react";

export default function Testimoni({ testi }) {
  return (
    <div className="w-full flex flex-col justify-center items-center py-14">
       <div className="text-center flex flex-col gap-2 px-1 mb-10">
      <h1 className="font-poppins-2 font-semibold text-xl lg:text-2xl mt-10">Testimoni</h1>
      <p className="font-poppins text-sm lg:text-base capitalize">Apa sih kata mereka?</p>
      </div>

      <Carousel
        slideSize={{ base: "100%", md: "50%", lg: "33.33%" }}
        slideGap="md"
        align="center"
        loop
        withIndicators={false}
        withControls={false}
        w="75%"
      >
        {testi?.map((item, i) => (
          <Carousel.Slide key={i}>
            <Card
              shadow="md"
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
