declare module '@react-navigation/stack' {
  import type { ComponentType } from 'react';

  export type StackNavigationProp<ParamList, RouteName extends keyof ParamList = keyof ParamList> = {
    navigate: (screen: RouteName | string, params?: unknown) => void;
    replace: (screen: RouteName | string, params?: unknown) => void;
    goBack: () => void;
  };

  export function createStackNavigator<ParamList = Record<string, object | undefined>>(): {
    Navigator: ComponentType<any>;
    Screen: ComponentType<any>;
  };
}
