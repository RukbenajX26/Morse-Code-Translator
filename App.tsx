import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from "react-native";

// Morse Code Mappings
const morseCodeMap = {
  A: ".-",   B: "-...", C: "-.-.", D: "-..",  E: ".",
  F: "..-.", G: "--.",  H: "....", I: "..",   J: ".---",
  K: "-.-",  L: ".-..", M: "--",   N: "-.",   O: "---",
  P: ".--.", Q: "--.-", R: ".-.",  S: "...",  T: "-",
  U: "..-",  V: "...-", W: ".--",  X: "-..-", Y: "-.--",
  Z: "--..", "1": ".----", "2": "..---", "3": "...--",
  "4": "....-", "5": ".....", "6": "-....", "7": "--...",
  "8": "---..", "9": "----.", "0": "-----", " ": "/"
};

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([letter, code]) => [code, letter])
);

// Morse Code Conversion Functions
const textToMorse = (text) => {
  return text.toUpperCase().split("").map(char => morseCodeMap[char] || "").join(" ");
};

const morseToText = (morse) => {
  return morse.split(" ").map(code => reverseMorseCodeMap[code] || "").join("");
};

// Main App Component
export default function App() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const clearFields = () => {
    setText("");
    setMorse("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Morse Code Translator</Text>

      {/* Text to Morse */}
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
      />
      <Button title="Convert to Morse" onPress={() => setMorse(textToMorse(text))} />
      <Text style={styles.output}>{morse}</Text>

      {/* Morse to Text */}
      <TextInput
        style={styles.input}
        placeholder="Enter Morse code (use spaces between letters)"
        value={morse}
        onChangeText={setMorse}
      />
      <Button title="Convert to Text" onPress={() => setText(morseToText(morse))} />
      <Text style={styles.output}>{text}</Text>

      {/* Clear Button */}
      <Button title="Clear" onPress={clearFields} color="red" />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, width: "100%", marginVertical: 10, textAlign: "center" },
  output: { fontSize: 18, marginVertical: 10, fontWeight: "bold" },
});