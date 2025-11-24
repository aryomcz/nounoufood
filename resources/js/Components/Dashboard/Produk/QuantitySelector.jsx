import { useState } from "react";
import { ActionIcon, TextInput, Group, Text } from "@mantine/core";
import { Icon } from "@iconify/react";

export default function QuantitySelector({ productId, initialStok, onUpdateStok }) {
  const [value, setValue] = useState(initialStok);

  const increment = () => {
    const newVal = value + 1;
    setValue(newVal);
    onUpdateStok(productId, newVal);
  };

  const decrement = () => {
    const newVal = Math.max(1, value - 1);
    setValue(newVal);
    onUpdateStok(productId, newVal);
  };

  const changeInput = (e) => {
    const newVal = Number(e.target.value);
    setValue(newVal);

    if (!isNaN(newVal) && newVal >= 1) {
      onUpdateStok(productId, newVal);
    }
  };

  return (
    <Group gap="xs">
      <ActionIcon size="md" radius={"xl"} color="black" variant="default" onClick={decrement}>
        <Icon icon="mdi:minus" width="18" />
      </ActionIcon>

      <TextInput w={40} value={value} onChange={changeInput} />

      <ActionIcon size="md" radius={"xl"} color="black" variant="default" onClick={increment}>
        <Icon icon="mdi:plus" width="18" />
      </ActionIcon>
    </Group>
  );
}
