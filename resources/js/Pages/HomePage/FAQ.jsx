import { Accordion } from "@mantine/core";
import { useTranslation } from "react-i18next";

export default function FAQ({faq}) {
  const {t} = useTranslation();
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10">
      <div className="text-center flex flex-col gap-2 px-1">
      <h1 className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10">FAQ</h1>
      <p className="font-poppins text-sm lg:text-lg capitalize">{t('faq_subtitle')}</p>
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
