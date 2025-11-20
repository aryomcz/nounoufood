import { Carousel } from "@mantine/carousel";
import { Text, Button, Image, Container, Group } from "@mantine/core";
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Icon } from "@iconify/react";
import classes from "../../../css/Hero.module.css"

const slides = [
  {
    title1: "Basreng",
    title2: "Pedas Nampol",
    subtitle: "Jagonya Basreng",
    desc: "Camilan goreng krispi dari bakso, dibalut bumbu cabai super pedas. Siap bikin lidahmu bergoyang!",
    image: "/images/basreng-1.png",
    bg:"#F44336",
    titlecolor:"#FFCA28"
  },
  {
    title1: "Keripik Pisang",
    title2: "Danggedang",
    subtitle: "Jagonya Keripik Pisang",
    desc: "Camilan goreng krispi dari pisang, dibalut berbagai rasa. Siap bikin lidahmu bergoyang!",
    image: "/images/keripik.png",
    bg:"#FFCA28",
    titlecolor:"#F44336"
  },
  {
    title1: "Minuman Kemasan",
    title2: "Segar",
    subtitle: "Jagonya Minuman Kemasan",
    desc: "Minuman segar dengan berbagai rasa. Siap bikin ",
    image: "/images/minuman.png",
    bg:"#FEF5E8",
    titlecolor:"#FFCA28"
  },
 
];


export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2500 }));
  return (
    <div className="w-full">
        <Carousel
          withIndicators
          height={"auto"}
          slideSize="100%"
          classNames={classes}
          controlSize={40}
          nextControlIcon={<Icon icon="tabler:chevron-right" width={25} color="black" />}
          previousControlIcon={<Icon icon="tabler:chevron-left" width={25} color="black" />}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={() => autoplay.current.play()}
          emblaOptions={{
            loop: true,
            dragFree: false,
            align: 'center'
          }}
        >
          {slides.map((item, i) => (
            <Carousel.Slide key={i} style={{ background: `${item.bg}` }}>
              <div className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 px-5 py-10 md:py-0">

                {/* LEFT TEXT */}
                <div className="w-full max-w-[600px] font-poppins-2 text-center md:text-left">
                  {i == 0 ? 
                    <h1 className={`font-bold md:text-[40px]`} style={{ color: item.titlecolor }}>
                      {item.title1}
                      <span className="text-black"> {item.title2}</span>
                    </h1>
                  :
                    <h1 className={`font-bold md:text-[40px] text-black`}>
                      {item.title1}
                      <span style={{ color: item.titlecolor }}> {item.title2}</span>
                    </h1>
                  }

                  <h2 fw={100} className="md:text-[24px] mt-1">
                    {item.subtitle}
                  </h2>

                  <div className="max-w-[480px] w-full mx-auto md:mx-0">
                    <p className="mt-2 md:text-[20px]">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <Image
                  src={item.image}
                  alt={item.title1}
                  className="max-w-[280px] md:max-w-[350px] object-contain"
                />
              </div>
            </Carousel.Slide>
          ))}

        </Carousel>
     
    </div>
  );
}
