import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

export function WIPAlert() {
  return (
    <Alert m={20} icon={<IconAlertCircle size={16} />} title="Work in progress 👷" color="yellow">
      Unfortunatelly, we could not finish all the nice 
      frontend features we wanted for the Chainlink 
      hackathon deadline, so this section is not yet available.
    </Alert>
  )
}
