import { ActionIcon, Avatar, Image, Button, Container, createStyles, Group, Header, Indicator, Text, Badge, Tooltip } from "@mantine/core"
import { IconWorld, IconUser } from '@tabler/icons';
import { Link } from 'react-router-dom';
import SwitchThemeToggle from "../SwitchThemeToggle/SwitchThemeToggle";
import logo from '../../assets/logo.svg';
import { useMediaQuery } from '@mantine/hooks';
import { useMetamask } from "../../hooks/useMetamask";
import { formatAddress } from "../../utils/stringUtils";
import { useEffect } from "react";


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
  const { connect, accounts, network, getAccounts, getNetwork } = useMetamask();

  useEffect(() => {
    getAccounts().then(() => getNetwork());
  }, [])
  
  
  const matches = useMediaQuery('(max-width: 600px)');
  const validNetwork = network?.chainId === 80001;

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
        {accounts[0]
          ? <>
              <Tooltip label={
                validNetwork 
                ? 'You are in the right network :)'
                : 'Please switch your network to Polygon Mumbai and reload'
              }>
                <Badge color={validNetwork ? 'violet':'red'}>
                  {validNetwork ? 'Polygon Mumbai' : 'Invalid Network'}
                </Badge>
              </Tooltip>
              <Text>{formatAddress(accounts[0])}</Text>
              <Avatar src={`https://avatars.dicebear.com/api/identicon/${accounts[0]}.svg`} />
            </>  
          : <> 
              <Indicator inline dot processing size={12} color={'yellow'}>
                <Button onClick={connect}>
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

