import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import MuhaffizStudentListScreen from './src/screens/StudentListScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import AddSetoranScreen from './src/screens/AddSetoranScreen';
import WaliDashboardScreen from './src/screens/WaliDashboardScreen';
import ReportScreen from './src/screens/ReportScreen';

export type RootStackParamList = {
  Login: undefined;
  MuhaffizStudentList: undefined;
  StudentDetail: { studentId: number };
  AddSetoran: { studentId: number };
  WaliDashboard: undefined;
  Report: { studentId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MuhaffizStudentList" component={MuhaffizStudentListScreen} />
          <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
          <Stack.Screen name="AddSetoran" component={AddSetoranScreen} />
          <Stack.Screen name="WaliDashboard" component={WaliDashboardScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
