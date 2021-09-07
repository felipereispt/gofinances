import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import {
  Container,
  HeaderContainer,
  Header,
  UserContainer,
  UserInfo,
  UserPhoto,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards
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

          <Icon name="power" />
        </Header>
      </HeaderContainer>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Último saldo dia 3 de abril"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
    </Container>
  );
}
