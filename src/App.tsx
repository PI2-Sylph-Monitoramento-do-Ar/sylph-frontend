import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocationContextProvider } from "./contexts/LocationContext";
import "_/config/firebaseConfig";
import { useFonts } from "./hooks/useFonts";
import { Navigation } from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TotemContextProvider } from "./contexts/TotemContext";
import { TotemService } from "./services/TotemService";
import { AuthContextProvider } from "./contexts/AuthContext";
import { COLORS } from "./constants/colors";
import { LogBox, Platform, StatusBar } from "react-native";
import { HttpsAdapter } from "./adapters/https/HttpsAdapter";
import { URL } from "./constants/secrets";
import { MeasureService } from "./services/MeasureService";
import { MeasureContextProvider } from "./contexts/MeasureContext";

export default function App() {
  const isFontLoaded = useFonts();

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const api = new HttpsAdapter(URL);
  const totemService = new TotemService(api);
  const measureService = new MeasureService(api);

  if (isFontLoaded)
    return (
      <>
        <StatusBar
          backgroundColor={COLORS.PRIMARY_COLOR}
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <SafeAreaProvider>
          <AuthContextProvider>
            <LocationContextProvider>
              <MeasureContextProvider measureService={measureService}>
                <TotemContextProvider totemService={totemService}>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <Navigation />
                  </GestureHandlerRootView>
                </TotemContextProvider>
              </MeasureContextProvider>
            </LocationContextProvider>
          </AuthContextProvider>
        </SafeAreaProvider>
      </>
    );
}
