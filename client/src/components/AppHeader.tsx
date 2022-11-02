import { Button, Container, createStyles, Header } from "@mantine/core"

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
        <Button>
          Connect
        </Button>
      </Container>
    </Header>
  )
}

export default AppHeader

