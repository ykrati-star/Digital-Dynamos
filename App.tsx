import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./app/(tabs)/LoginScreen";
import HomeStackScreen from "./app/(tabs)/explore";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
