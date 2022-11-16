import { SimpleGrid, Skeleton } from '@mantine/core';

const size = 9;

export function GridLoader() {
  return (
    <SimpleGrid
    cols={3}
    mt="md"
    breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
    {[...Array(size)].map((item, i) => (<Skeleton height={300} key={i} />))}
  </SimpleGrid>
  );
}