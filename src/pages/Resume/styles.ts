import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const HistoryCardContainer = styled.ScrollView``;
