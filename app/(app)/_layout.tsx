import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { lightTheme } from "../../theme/lightTheme";

export default function RootLayout() {
  return (
    <PaperProvider theme={lightTheme}>
      <Stack />
    </PaperProvider>
  );
}
