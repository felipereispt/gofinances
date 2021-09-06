import React from 'react';
import { Text, View, Image } from 'react-native';

import {
  Container,
  HeaderContainer,
  Header,
  UserContainer,
  UserInfo,
  UserPhoto,
  UserGreeting,
  UserName
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <UserContainer>
            <UserPhoto source={{ uri: 'https://avatars.githubusercontent.com/u/7799406?v=4' }} />
            <UserInfo>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Felipe</UserName>
            </UserInfo>
          </UserContainer>
        </Header>
      </HeaderContainer>
    </Container>
  );
}
