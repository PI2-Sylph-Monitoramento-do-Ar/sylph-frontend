import { LocationContextProvider } from "./contexts/LocationContext";
import { useFonts } from "./hooks/useFonts";
import { Navigation } from "./navigation";

export default function App() {
  const isFontLoaded = useFonts();

  if (isFontLoaded)
    return (
      <LocationContextProvider>
        <Navigation />
      </LocationContextProvider>
    );
}
