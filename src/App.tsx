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
import { LoaderContextProvider } from "./contexts/LoaderContext";
import { LocalStorageService } from "./services/LocalStorageService";
import { GuestContextProvider } from "./contexts/GuestContext";
import { AuthService } from "./services/AuthService";

export default function App() {
  const isFontLoaded = useFonts();

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const localStorage = new LocalStorageService();
  const api = new HttpsAdapter(URL);
  const totemService = new TotemService(api);
  const measureService = new MeasureService(api);

  const authService = new AuthService()

  if (isFontLoaded)
    return (
      <>
        <StatusBar
          backgroundColor={COLORS.PRIMARY_COLOR}
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <SafeAreaProvider>
          <LoaderContextProvider>
            <AuthContextProvider localStorage={localStorage} authService={authService}>
              <GuestContextProvider localStorage={localStorage}>
                <LocationContextProvider>
                  <MeasureContextProvider measureService={measureService}>
                    <TotemContextProvider totemService={totemService}>
                      <GestureHandlerRootView style={{ flex: 1 }}>
                        <Navigation />
                      </GestureHandlerRootView>
                    </TotemContextProvider>
                  </MeasureContextProvider>
                </LocationContextProvider>
              </GuestContextProvider>
            </AuthContextProvider>
          </LoaderContextProvider>
        </SafeAreaProvider>
      </>
    );
}
