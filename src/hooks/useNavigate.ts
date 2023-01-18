import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MapStackParams } from "_/navigation/map";

type NavigationStack = MapStackParams;

export const useNavigate = () =>
  useNavigation<NavigationProp<NavigationStack>>();
