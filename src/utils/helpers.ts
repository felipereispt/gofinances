import { TransactionsProps } from '../components/TransactionCard';
import * as Localization from 'expo-localization';

function formatCurrency(value: number) {
  return Intl.NumberFormat(String(Localization.locale), {
    style: 'currency',
    currency: String(Localization.currency),
  }).format(value);
}

function formatDate(date: Date) {
  return Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function getTransactionsByType(
  collection: TransactionsProps[],
  type: 'positive' | 'negative'
) {
  return collection.filter((transaction) => transaction.type === type);
}

function getTransactionsByTypeAndDate(
  collection: TransactionsProps[],
  type: 'positive' | 'negative',
  date: Date
) {
  return collection.filter(
    (transaction) =>
      transaction.type === type &&
      new Date(transaction.date).getMonth() === date.getMonth() &&
      new Date(transaction.date).getFullYear() === date.getFullYear()
  );
}

export {
  formatCurrency,
  formatDate,
  getTransactionsByType,
  getTransactionsByTypeAndDate,
};
