import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocationContextProvider } from "./contexts/LocationContext";
import { useFonts } from "./hooks/useFonts";
import { Navigation } from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TotemContextProvider } from "./contexts/TotemContext";
import { TotemService } from "./services/TotemService";
import ChartsScreen from "./screens/ChartsScreen";

export default function App() {
  const isFontLoaded = useFonts();

  const totemService = new TotemService();

  if (isFontLoaded)
    return (
      <SafeAreaProvider>
        <LocationContextProvider>
          <TotemContextProvider totemService={totemService}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Navigation />
            </GestureHandlerRootView>
          </TotemContextProvider>
        </LocationContextProvider>
      </SafeAreaProvider>
    );
}
