import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { CartScreen } from '../screens/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { RestaurantDetailsScreen } from '../screens/RestaurantDetailsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  RestaurantDetails: { restaurantId: string };
  Payment: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { t } = useTranslation();
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSoft,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: mode === 'dark' ? '#000000' : '#1F160F',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: mode === 'dark' ? 0.35 : 0.08,
          shadowRadius: 18,
          elevation: 10,
        },
        tabBarIcon: ({ color, focused, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: focused ? 'home' : 'home-outline',
            Search: focused ? 'search' : 'search-outline',
            Cart: focused ? 'cart' : 'cart-outline',
            Profile: focused ? 'person' : 'person-outline',
          };

          return <Ionicons name={icons[route.name]} size={size + 1} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('tabs.home') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: t('tabs.search') }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: t('tabs.cart') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('tabs.profile') }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
