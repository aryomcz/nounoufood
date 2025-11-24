import { Card, Text, Group, Image, Badge, Stack, List, ThemeIcon } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import {motion} from "motion/react";

export default function Company({ company }) {
  const { t } = useTranslation();
  // Split data visi & misi berdasarkan koma
  const visiList = company?.visi?.split(",").map((v) => v.trim());
  const misiList = company?.misi?.split(",").map((m) => m.trim());

  return (
    <div id="about" className="w-full flex flex-col items-center py-10">

      <motion.img src={company?.foto} alt="Foto Company" className="w-full max-w-[840px] rounded-2xl h-auto object-cover" srcset="" initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{
          type: "spring",
          bounce: 0.5,
          stiffness: 90, // sedikit lebih kuat agar smooth naik
          damping: 15,
        }} />

      {/* Tentang Kami + Visi Misi */}
      <div className="flex flex-wrap gap-5 md:gap-10 h-full w-full justify-center mt-12">
        
        {/* Tentang Kami */}
        <motion.div initial={{ x: -90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          type: "spring",
          bounce: 0.5,
          stiffness: 70,
          damping: 14,
        }}>
        <Card 
          withBorder
          shadow="md"
          padding="lg"
          radius="lg"
          mih={"100%"}
          
          className="bg-[#F4B346] w-full max-w-[480px]"
        >
          <Stack mih={"100%"} justify="space-between">
            <div>
                <Group justify="space-between" align="center">
                    <Text fw={700} size="xl" className="font-poppins-2">
                        {t('sejarah')}
                    </Text>
                    <Badge color="orange">
                    {t('tahun')} {company?.tahun_berdiri}
                    </Badge>
                </Group>
              <Text mt="sm" className="leading-relaxed">
                {company?.sejarah}
              </Text>
            </div>
          </Stack>
        </Card>
        </motion.div>

        {/* VISI & MISI */}
        <div className="flex flex-wrap lg:flex-col gap-5 w-full lg:max-w-[360px] justify-center">

          {/* Visi */}
          <motion.div  initial={{ x: 90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 14,
        }}>
          <Card withBorder shadow="md" padding="lg" radius="lg"  className="max-w-[320px] lg:max-w-[360px]">
            <Text fw={700} size="xl">{t('visi')}</Text>

            <List
              spacing="xs"
              pl={0}
              size="sm"
              mt="xs"
              icon={
                <ThemeIcon color="white" size={32} >
                  <Icon icon="material-symbols:check-circle-outline-rounded" width={24} style={{ color: "black" }} />
                </ThemeIcon>
              }
            >
              {visiList?.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </Card>
          </motion.div>

          {/* Misi */}
          <motion.div  initial={{ x: 90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 14,
        }}>
          <Card withBorder shadow="md" padding="lg" radius="lg"  className="max-w-[320px] lg:max-w-[360px]">
            <Text fw={700} size="xl">{t('misi')}</Text>

            <List
              spacing="xs"
              size="sm"
              mt="xs"
              pl={0}
              icon={
                <ThemeIcon color="white" size={32} >
                 <Icon icon="material-symbols:check-circle-outline-rounded" width={24} style={{ color: "black" }} />
                </ThemeIcon>
              }
            >
              {misiList?.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
