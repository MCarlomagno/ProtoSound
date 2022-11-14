import { ActionIcon, Avatar, Image, Button, Container, createStyles, Group, Header, Indicator, Text } from "@mantine/core"
import { IconWorld, IconUser } from '@tabler/icons';
import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SwitchThemeToggle from "../SwitchThemeToggle/SwitchThemeToggle";
import logo from '../../assets/logo.svg';
import { useMediaQuery } from '@mantine/hooks';
import { useMetamask } from "../../hooks/useMetamask";
import { formatAddress } from "../../utils/stringUtils";

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
  const { connect, accounts, getAccounts } = useMetamask();
  const [address, setAddress] = useState('');
  const matches = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    getAccounts().then((acc) => {
      if (acc[0]) {
        setAddress(acc[0]);
      }
    });
  }, [accounts]);

  const connectWallet = useCallback(async () => {
    await connect();
    const acc = await getAccounts();
    if (acc[0]) {
      setAddress(acc[0]);
    }
  }, [accounts]);

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
        {address 
          ? <>
              <Text>{formatAddress(address)}</Text>
              <Avatar src={`https://avatars.dicebear.com/api/identicon/${address}.svg`} />
            </>  
          : <> 
              <Indicator inline dot processing size={12} color={'yellow'}>
                <Button onClick={connectWallet}>
                  Connect
                </Button>
              </Indicator>
            <Avatar />
            </>}
          <SwitchThemeToggle />
        </Group>
      </Container>
    </Header>
  )
}

export default AppHeader

