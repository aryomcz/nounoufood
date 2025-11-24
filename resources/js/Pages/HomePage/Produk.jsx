import { useEffect, useState, useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Button, Stack, Group } from '@mantine/core';
import axios from 'axios';

export default function CarouselBestSeller({ produk }) {
  const [translatedProducts, setTranslatedProducts] = useState([]);
  const carouselRef = useRef(null);

  // Fungsi panggil backend translate
  async function translateText(text, lang = 'en') {
    try {
      const res = await axios.post('/api/translate', { text, targetLang: lang });
      return res.data.text;
    } catch (err) {
      console.error(err);
      return text; // fallback ke teks asli
    }
  }

  useEffect(() => {
    async function runTranslate() {
      const results = [];
      for (const p of produk) {
        const nama = await translateText(p.nama, 'en');
        const deskripsi = await translateText(p.deskripsi ?? '', 'en');
        results.push({ ...p, nama, deskripsi });
      }
      setTranslatedProducts(results);
    }

    runTranslate();
  }, [produk]);

  return (
    <div ref={carouselRef}>
      <Carousel slideSize="256px" slideGap="md" align="center" withIndicators>
        {translatedProducts.map(p => (
          <Carousel.Slide key={p.id}>
            <Card shadow="sm" padding="lg" radius="md">
              <Card.Section>
                <Image src={p.foto} alt={p.nama} height={150} />
              </Card.Section>
              <Stack mt="sm">
                <Text weight={600}>{p.nama}</Text>
                <Text size="sm" c="dimmed">{p.deskripsi}</Text>
                <Group mt="sm" position="apart">
                  <Button size="xs">Keranjang</Button>
                  <Button size="xs" color="green">Pesan</Button>
                </Group>
              </Stack>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
