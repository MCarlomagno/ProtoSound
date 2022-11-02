import { Button, Container, createStyles, Group, Header } from "@mantine/core"
import SwitchToggle from "./SwitchToggle";

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
        Protosound
        <Group>
          <Button>
            Connect
          </Button>
          <SwitchToggle />
        </Group>

      </Container>
    </Header>
  )
}

export default AppHeader

