import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Button, Group, Badge, Stack, Accordion } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import classes from "../../../css/Hero.module.css"

export default function FAQ({faq}) {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10">
      <div className="text-center flex flex-col gap-2 px-1">
      <h1 className="font-poppins-2 font-semibold text-xl lg:text-2xl mt-10">FAQ</h1>
      <p className="font-poppins text-sm lg:text-base capitalize">Pertanyaan yang paling sering ditanyakan</p>
      </div>
      <Accordion variant="contained" radius="xs" w={"100%"} color="#feefd5" styles={{
    control: {
      backgroundColor: "transparent",
      border:"black",
      '&:hover': {
        backgroundColor: "transparent",
      },
    },
    item: {
      backgroundColor: "transparent",
    },
    content: {
    //   backgroundColor: "transparent",
    }
  }}>
        {faq?.map((item) => (
        <Accordion.Item key={item.pertanyaan} value={item.pertanyaan}>
            <Accordion.Control>{item.pertanyaan}</Accordion.Control>
            <Accordion.Panel>{item.jawaban}</Accordion.Panel>
        </Accordion.Item>
        ))}
    </Accordion>
    </div>
  )
}
