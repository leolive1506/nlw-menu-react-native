import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Hello react native</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1
  }
})