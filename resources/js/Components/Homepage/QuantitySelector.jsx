import { useState } from "react";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export default function QuantitySelector({ 
  cartId, 
  initialQty, 
  onUpdateQty,
  min = 1,
  max = 99 
}) {
  const [value, setValue] = useState(initialQty);
    const { t } = useTranslation();
  const increment = () => {
    if (value >= max) return;
    const newVal = value + 1;
    setValue(newVal);
    onUpdateQty(cartId, newVal);
  };

  const decrement = () => {
    if (value <= min) return;
    const newVal = value - 1;
    setValue(newVal);
    onUpdateQty(cartId, newVal);
  };

  return (
    <Group gap="xs">
      <Tooltip label={t("minimum_qty")} disabled={value > min}>
        <ActionIcon 
          size="md" 
          radius="xl" 
          color="black" 
          variant="default"
          onClick={decrement}
          disabled={value <= min}
        >
          <Icon icon="mdi:minus" width={18} />
        </ActionIcon>
      </Tooltip>

      <Text>{value}</Text>

      <Tooltip label={t("maximum_qty")} disabled={value < max}>
        <ActionIcon 
          size="md" 
          radius="xl" 
          color="black" 
          variant="default"
          onClick={increment}
          disabled={value >= max}
        >
          <Icon icon="mdi:plus" width={18} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
