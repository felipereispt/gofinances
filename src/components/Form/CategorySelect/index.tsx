import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title } from './styles';

interface CategorySelectProps extends RectButtonProps {
  title: string;
}

export function CategorySelect({ title, ...rest }: CategorySelectProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>

      <Icon name="chevron-down" />
    </Container>
  );
}
