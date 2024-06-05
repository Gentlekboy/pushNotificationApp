import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {GeofenceNavigatorParamList} from "../../navigation/stack/types";

export type GeofencesScreenNavProps = NativeStackScreenProps<
  GeofenceNavigatorParamList,
  "GeofenceList"
>;
