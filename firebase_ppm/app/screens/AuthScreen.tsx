import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const redirectUri = makeRedirectUri({ scheme: "firebaseppm" });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "622173820783-0l3f2u206qhm8d1k2u11dgsoip0eul3v.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        const idToken = (response.authentication as any)?.idToken;
        if (!idToken) return;
        const cred = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, cred);
      }
    })();
  }, [response]);

  const login = async () => {
    try { await signInWithEmailAndPassword(auth, email.trim(), pass); }
    catch (e: any) { Alert.alert("Gabim në login", e.message); }
  };
  const register = async () => {
    try { await createUserWithEmailAndPassword(auth, email.trim(), pass); }
    catch (e: any) { Alert.alert("Gabim në regjistrim", e.message); }
  };

  return (
    <View style={{ flex:1, justifyContent:"center", padding:20, gap:12 }}>
      <Text style={{ fontSize:22, fontWeight:"600" }}>Hyr / Regjistrohu</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth:1, padding:12, borderRadius:8 }}
      />
      <TextInput
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={{ borderWidth:1, padding:12, borderRadius:8 }}
      />

      <Button title="Login" onPress={login} />
      <Button title="Regjistrohu" onPress={register} />

      <Text style={{ textAlign:"center", marginTop:16 }}>— ose —</Text>
      <Button
  title="Vazhdo me Google"
  disabled={!request}
  onPress={() => promptAsync()} 
/>

    </View>
  );
}
