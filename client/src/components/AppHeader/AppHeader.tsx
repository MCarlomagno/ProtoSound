import { ActionIcon, Avatar, Image, Button, Container, createStyles, Group, Header, Indicator, MediaQuery } from "@mantine/core"
import { IconWorld, IconUser } from '@tabler/icons';
import { useState } from "react";
import { Link } from 'react-router-dom';
import SwitchThemeToggle from "../SwitchThemeToggle/SwitchThemeToggle";
import logo from '../../assets/logo.svg';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  headerMobile: {
    height: '100%',
    justifyContent: 'center',
  }
}));

function AppHeader() {
  const { classes } = useStyles();
  const [address, setAddress] = useState('');
  const matches = useMediaQuery('(max-width: 600px)');

  return (
    <Header height={matches ? 120 : 60} style={{minHeight: matches ? 120 : 60}} p="lg">
      <Container className={ matches ? classes.headerMobile : classes.header}>
        <Group>
          <Link to="/">
            <Image src={logo} height={30} alt={'ProtoSound'}/>
          </Link>
          <ActionIcon component={Link} to="/feed">
            <IconWorld size={18} />
          </ActionIcon>
          <ActionIcon component={Link} to="/profile">
            <IconUser size={18} />
          </ActionIcon>
        </Group>
        <Group >
          <Indicator inline dot processing size={12} color={'yellow'}>
            <Button>
              Connect
            </Button>
          </Indicator>
          <Avatar src={address ?? `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
          <SwitchThemeToggle />
        </Group>
      </Container>
    </Header>
  )
}

export default AppHeader

