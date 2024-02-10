# app.json
- informações da aplicação
# src/app
  - tudo dentro app, expo router, entende que faz parte das rotas


# Estilzação
```tsx
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1
  }
})

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Hello react native</Text>
    </View>
  )
}
```

# Configure tailwind
```sh
npm i nativewind@2.0.11
npm i tailwindcss@3.2.2 --save-dev
npx tailwindcss init
```
- tailwind config
```tsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- babel.config
```ts
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"]
  };
};
```