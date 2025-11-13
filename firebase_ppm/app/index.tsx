// app/index.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
    return () => sub();
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return user ? <HomeScreen /> : <AuthScreen />;
}
