import { createStyles, Paper, Text, Title, Button } from '@mantine/core';
import { IconDisc, IconWorld } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPositionY: '100%'
  },

  title: {
    fontWeight: 900,
    color: '#fafafa',
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  description: {
    color: '#fafafa',
    opacity: 0.9,
    textShadow: '0 0 2px #000',
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  button: {
    color: 'black',
  }
}));

interface ButtonProps {
  label: string;
  icon: 'browse' | 'create';
}

interface ArticleCardImageProps {
  image: string;
  title: string;
  description: string;
  buttonProps: ButtonProps;
}

export function CardBackground({ image, title, description, buttonProps }: ArticleCardImageProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="lg"
      sx={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url(${image})` }}
      className={classes.card}
    >
        <div>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
          <Text className={classes.description} size="sm" mt={15}>
            {description}
          </Text>
        </div>
        <Button className={classes.button} variant={'white'} leftIcon={buttonProps.icon === 'browse' ? <IconWorld /> : <IconDisc />}>
          {buttonProps.label}
        </Button>
    </Paper>
  );
}