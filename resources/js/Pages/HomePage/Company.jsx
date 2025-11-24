import { Card, Text, Group, Image, Badge, Stack, List, ThemeIcon } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export default function Company({ company }) {
  const { t } = useTranslation();
  // Split data visi & misi berdasarkan koma
  const visiList = company.visi?.split(",").map((v) => v.trim());
  const misiList = company.misi?.split(",").map((m) => m.trim());

  return (
    <div id="about" className="w-full flex flex-col items-center py-10">

      <img src={company?.foto} alt="Foto Company" className="w-full max-w-[840px] rounded-2xl h-auto object-cover" srcset="" />

      {/* Tentang Kami + Visi Misi */}
      <div className="flex flex-wrap gap-5 md:gap-10 h-full w-full justify-center mt-12">
        
        {/* Tentang Kami */}
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
                    {t('tahun')} {company.tahun_berdiri}
                    </Badge>
                </Group>
              <Text mt="sm" className="leading-relaxed">
                {company?.sejarah}
              </Text>
            </div>
          </Stack>
        </Card>

        {/* VISI & MISI */}
        <div className="flex flex-wrap lg:flex-col gap-5 w-full lg:max-w-[360px] justify-center">

          {/* Visi */}
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

          {/* Misi */}
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

        </div>
      </div>
    </div>
  );
}
