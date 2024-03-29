import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { TransactionsListProps } from './';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContainer = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const Header = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserInfo = styled.View`
  margin-left: 17px;
`;

export const UserPhoto = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;

  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const TransactionsContainer = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(8)}px;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<TransactionsListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const LoadingContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
