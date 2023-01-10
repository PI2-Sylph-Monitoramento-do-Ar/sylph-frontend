import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocationContextProvider } from "./contexts/LocationContext";
import { useFonts } from "./hooks/useFonts";
import { Navigation } from "./navigation";
import "react-native-gesture-handler";

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
