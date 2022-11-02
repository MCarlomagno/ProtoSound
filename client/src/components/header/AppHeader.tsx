import { ActionIcon, Button, Container, createStyles, Group, Header } from "@mantine/core"
import { IconWorld, IconUser } from '@tabler/icons';
import { Link } from 'react-router-dom';
import SwitchThemeToggle from "./SwitchThemeToggle";

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

function AppHeader() {
  const { classes } = useStyles();

  return (
    <Header height={60} p="lg">
      <Container className={classes.header}>
        <Group>
          Protosound
          <ActionIcon component={Link} to="/">
            <IconWorld size={18} />
          </ActionIcon>
          <ActionIcon component={Link} to="/profile">
            <IconUser size={18} />
          </ActionIcon>
        </Group>
        <Group>
          <Button>
            Connect
          </Button>
          <SwitchThemeToggle />
        </Group>
      </Container>
    </Header>
  )
}

export default AppHeader

