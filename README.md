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

