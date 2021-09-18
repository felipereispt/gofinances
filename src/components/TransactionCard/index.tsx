import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionsProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

export interface TransactionsProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

interface TransactionCardProps {
  transaction: TransactionsProps;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Container>
      <Title>{transaction.title}</Title>

      <Amount
        type={transaction.type}
      >
        {transaction.type === 'negative' && '- '}
        {transaction.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={transaction.category.icon} />
          <CategoryName>{transaction.category.name}</CategoryName>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
}
