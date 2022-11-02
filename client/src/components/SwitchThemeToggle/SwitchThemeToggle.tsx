import { Switch, Group, useMantineColorScheme, useMantineTheme, Center } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

function SwitchThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="md"
        mb={15}
        onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      />
  );
}

export default SwitchThemeToggle