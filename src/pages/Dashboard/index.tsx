import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionsProps } from '../../components/TransactionCard';

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
  HighlightCards,
  TransactionsList,
  TransactionsContainer,
  Title
} from './styles';

export interface TransactionsListProps extends TransactionsProps {
  id: string;
}

export function Dashboard() {
  const transactions: TransactionsListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburguer de frango",
      amount: "R$ 49,90",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "10/04/2020"
    },
    {
      id: '3',
      type: 'negative',
      title: "Compra de material",
      amount: "R$ 500,00",
      category: {
        name: 'Compra',
        icon: 'shopping-bag'
      },
      date: "10/04/2020"
    }
  ];

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

      <TransactionsContainer>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      </TransactionsContainer>
    </Container>
  );
}
