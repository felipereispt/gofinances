import { TransactionsProps } from '../components/TransactionCard';

function formatCurrency(value: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
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

export { formatCurrency, formatDate, getTransactionsByType };
