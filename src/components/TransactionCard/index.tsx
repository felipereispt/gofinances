import React from 'react';

import { categories } from '../../utils/categories';

import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from './styles';

export interface TransactionsProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  transaction: TransactionsProps;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const category = categories.find(
    (category) => category.key === transaction.category
  );

  return (
    <Container>
      <Title>{transaction.title}</Title>

      <Amount type={transaction.type}>
        {transaction.type === 'negative' && '- '}
        {transaction.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
}
