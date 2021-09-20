import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Title,
  Icon
} from './styles';

interface CategorySelectProps extends TouchableOpacityProps {
  title: string;
}

export function CategorySelect({ title, ...rest }: CategorySelectProps) {
  return (
    <Container {...rest}>
      <Title>
        {title}
      </Title>

      <Icon name="chevron-down" />
    </Container>
  );
}
