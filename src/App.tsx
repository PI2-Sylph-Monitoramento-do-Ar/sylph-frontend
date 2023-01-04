// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "./constants/colors";
import { LocationContextProvider } from "./contexts/LocationContext";
import { useFonts } from "./hooks/useFonts";
import { Navigation } from "./navigation";

export default function App() {
  const isFontLoaded = useFonts();

  if (isFontLoaded)
    return (
      <SafeAreaProvider>
        <LocationContextProvider>
          <Navigation />
        </LocationContextProvider>
      </SafeAreaProvider>
    );
}
