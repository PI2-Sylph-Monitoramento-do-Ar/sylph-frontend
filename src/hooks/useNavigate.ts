import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParams } from "_/navigation";
import { MapStackParams } from "_/navigation/map";

type NavigationStack = MapStackParams & AppStackParams;

export const useNavigate = () =>
  useNavigation<NavigationProp<NavigationStack>>();
