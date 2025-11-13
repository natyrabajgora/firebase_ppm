import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function HomeScreen() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", gap:12 }}>
      <Text style={{ fontSize:18 }}>
        Je i/e loguar si {auth.currentUser?.email || auth.currentUser?.displayName}
      </Text>
      <Button title="Dil (Sign out)" onPress={() => signOut(auth)} />
    </View>
  );
}
