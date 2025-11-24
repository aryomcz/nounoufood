import { Carousel } from "@mantine/carousel";
import { Text, Button, Image, Container, Group } from "@mantine/core";
import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Icon } from "@iconify/react";
import classes from "../../../css/Hero.module.css";

const slides = [
  {
    title1: "Basreng",
    title2: "Pedas Nampol",
    subtitle: "Jagonya Basreng",
    desc: "Camilan goreng krispi dari bakso, dibalut bumbu cabai pedas. Siap ngegas lidah kamu!",
    image: "/images/basreng-1.png",
    bg:"#DD0303",
    titlecolor:"#FFCA28"
  },
  {
    title1: "Keripik Pisang",
    title2: "Danggedang",
    subtitle: "Jagonya Keripik Pisang",
    desc: "Cemilan renyah yang susah berhenti. Sekali coba, auto nagih!",
    image: "/images/keripik.png",
    bg:"#FFCA28",
    titlecolor:"#4F200D"
  },
  {
    title1: "Minuman Kemasan",
    title2: "Segar",
    subtitle: "Jagonya Minuman Kemasan",
    desc: "Minuman dingin yang bikin kamu auto fresh! Cocok buat panas-panasan.",
    image: "/images/minuman.png",
    bg:"#FEF5E8",
    titlecolor:"#FFCA28"
  },
];

export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2500 }));
  const [active, setActive] = useState(0);

  return (
    <div id="home" className="w-full">
      
      <Carousel
        withIndicators
        height={"auto"}
        slideSize="100%"
        classNames={classes}
        controlSize={40}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
        onSlideChange={setActive}
        emblaOptions={{
          loop: true,
          dragFree: false,
          align: 'center'
        }}
      >

        {slides.map((item, i) => (
          <Carousel.Slide key={i} className="relative overflow-hidden">

            {/* BACKGROUND PARALLAX */}
            <div 
              className="absolute inset-0"
              style={{
                background: item.bg,
                transform: active === i ? "scale(1)" : "scale(1.2)",
                transition: "transform 1000ms ease"
              }}
            ></div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 px-5 py-14">

              {/* TEXT CONTENT */}
              <div
                className={`w-full max-w-[600px] font-poppins-2 text-center md:text-left transition-all duration-1000 ${
                  active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {i === 0 ? (
                  <h1 className="font-bold text-2xl md:text-[40px]" style={{ color: item.titlecolor }}>
                    {item.title1} <span className="text-black">{item.title2}</span>
                  </h1>
                ) : (
                  <h1 className="font-bold text-2xl md:text-[40px] text-black">
                    {item.title1}
                    <span style={{ color: item.titlecolor }}> {item.title2}</span>
                  </h1>
                )}

                <h2 className="text-[20px] md:text-[24px] mt-1 font-light">
                  {item.subtitle}
                </h2>

                <p className="max-w-[480px] mx-auto md:mx-0 mt-2 md:text-[20px]">
                  {item.desc}
                </p>
              </div>

              {/* IMAGE WITH 3D EFFECT */}
              <Image
                src={item.image}
                alt={item.title1}
                className={`
                  max-w-[260px] md:max-w-[350px] object-contain transition-all duration-1000
                  ${active === i ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-20 rotate-12"}
                `}
              />
            </div>
          </Carousel.Slide>
        ))}

      </Carousel>
    </div>
  );
}
