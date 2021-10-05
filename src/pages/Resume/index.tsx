import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';
import { TransactionsProps } from '../../components/TransactionCard';

import { getTransactionsByType, formatCurrency } from '../../utils/helpers';
import { categories } from '../../utils/categories';

import {
  Container,
  LoadingContainer,
  ChartContainer,
  HistoryCardContainer,
} from './styles';

interface CategoriesTotal {
  name: string;
  total: number;
  totalCurrency: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesTotal, setCategoriesTotal] = useState<CategoriesTotal[]>([]);

  const theme = useTheme();

  async function loadData() {
    setIsLoading(true);
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactionsData = data ? JSON.parse(data) : [];

    const expensives = getTransactionsByType(transactionsData, 'negative');
    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionsProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategories: CategoriesTotal[] = [];

    categories.forEach((category) => {
      let categoryTotal = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categoryTotal += Number(expensive.amount);
        }
      });

      if (categoryTotal > 0) {
        const percent = `${((categoryTotal / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategories.push({
          name: category.name,
          totalCurrency: formatCurrency(categoryTotal),
          total: categoryTotal,
          color: category.color,
          percent,
        });
      }
    });

    setCategoriesTotal(totalByCategories);
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
          <Header title="Resumo por categoria" />

          <ChartContainer>
            <VictoryPie
              data={categoriesTotal}
              colorScale={categoriesTotal.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>
          <HistoryCardContainer
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            {categoriesTotal.map((item) => (
              <HistoryCard
                title={item.name}
                amount={item.totalCurrency}
                color={item.color}
                key={item.name}
              />
            ))}
          </HistoryCardContainer>
        </>
      )}
    </Container>
  );
}
