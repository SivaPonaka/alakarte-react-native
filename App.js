import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {store} from './helpers/store';
import {Provider as StorProvider} from 'react-redux';
import {navigationRef} from './RootNavigation';
import {ItemDetails} from './screens/ItemDetails/ItemDeatils';
import {Cart} from './screens/Cart/Cart';
import {OrderHistory} from './screens/OrderHistory/OrderHistory';
import {Address} from './screens/Address/Address';
import {Order} from './screens/Order/Order';
// import {Payment} from './screens/Payment/Payment';
import {AppLanguage} from './screens/AppLanguage/AppLanguage';
import {Register} from './screens/Register/Register';
import {AddAddress} from './screens/AddAddress/AddAddress';
import {ChangeAddress} from './screens/AddAddress/ChangeAddress';





export default function App() {
  const Stack = createStackNavigator();

  const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
      ...DefaultTheme.colors,
      primary: '#26988A',
      accent: '#26988A',
    },
    fonts: {
      regular: 12,
      medium: 10,
      light: 8,
      thin: 4,
    },
  };
  return (
    <PaperProvider theme={theme}>
      <StorProvider store={store}>
        
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Tabs">
            <Stack.Screen name="Browser" component={Tabs} />
            <Stack.Screen name="ItemDetails" component={ItemDetails} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="Order" component={Order} />
            {/* <Stack.Screen name="Payment" component={Payment} /> */}
            <Stack.Screen name="AppLanguage" component={AppLanguage} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </StorProvider>
    </PaperProvider>
  );
}
