import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import { formatCurrency, formatDate } from '../../utils/helpers';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionsProps,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  HeaderContainer,
  HighlightCards,
  Icon,
  LogoutButton,
  Title,
  TransactionsContainer,
  TransactionsList,
  UserContainer,
  UserGreeting,
  UserInfo,
  UserName,
  UserPhoto,
  LoadingContainer,
} from './styles';

import { useTheme } from 'styled-components';

export interface TransactionsListProps extends TransactionsProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  function getLastTransactionDate(
    collection: TransactionsListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      {
        month: 'long',
      }
    )}`;
  }

  async function loadData() {
    setIsLoading(true);
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactionsData = data ? JSON.parse(data) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: TransactionsListProps[] = transactionsData.map(
      (transaction: TransactionsListProps) => {
        if (transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount);
        } else {
          expensivesTotal += Number(transaction.amount);
        }

        const amount = formatCurrency(Number(transaction.amount));

        const date = formatDate(new Date(transaction.date));

        return {
          id: transaction.id,
          title: transaction.title,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        };
      }
    );

    const lastTransactionDateEntries = getLastTransactionDate(
      transactionsData,
      'positive'
    );

    const lastTransactionDateExpensives = getLastTransactionDate(
      transactionsData,
      'negative'
    );

    const totalInterval = `1 à ${lastTransactionDateExpensives}`;

    const total = entriesTotal - expensivesTotal;

    setTransactions(transactionsFormatted);
    setHighlightData({
      entries: {
        amount: formatCurrency(entriesTotal),
        lastTransaction: `Última entrada dia ${lastTransactionDateEntries}`,
      },
      expensives: {
        amount: formatCurrency(expensivesTotal),
        lastTransaction: `Última saída dia ${lastTransactionDateExpensives}`,
      },
      total: {
        amount: formatCurrency(total),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <HeaderContainer>
            <Header>
              <UserContainer>
                <UserPhoto
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/7799406?v=4',
                  }}
                />
                <UserInfo>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Felipe</UserName>
                </UserInfo>
              </UserContainer>

              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </Header>
          </HeaderContainer>

          <HighlightCards>
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />

            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />

            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
