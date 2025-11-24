import { useState } from "react";
import { ActionIcon, TextInput, Group, Text } from "@mantine/core";
import { Icon } from "@iconify/react";

export default function QuantitySelector({ cartId, initialQty, onUpdateQty }) {
  const [value, setValue] = useState(initialQty);

  const increment = () => {
    const newVal = value + 1;
    setValue(newVal);
    onUpdateQty(cartId, newVal);
  };

  const decrement = () => {
    const newVal = Math.max(1, value - 1);
    setValue(newVal);
    onUpdateQty(cartId, newVal);
  };

  const changeInput = (e) => {
    const newVal = Number(e.target.value);
    setValue(newVal);

    if (!isNaN(newVal) && newVal >= 1) {
      onUpdateQty(cartId, newVal);
    }
  };

  return (
    <Group gap="xs">
      <ActionIcon size="md" radius={"xl"} color="black" variant="default" onClick={decrement}>
        <Icon icon="mdi:minus" width="18" />
      </ActionIcon>

      <Text>{value}</Text>

      <ActionIcon size="md" radius={"xl"} color="black" variant="default" onClick={increment}>
        <Icon icon="mdi:plus" width="18" />
      </ActionIcon>
    </Group>
  );
}
