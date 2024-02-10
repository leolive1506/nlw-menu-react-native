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
# permite aplicar classes condicionamente
npm i clsx
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

# Criando layout
- criar arquivo _layout.tsx
```tsx
import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Slot />
    </SafeAreaView>
  )
}
```

# Personalizar fontes
```sh
npx expo install expo-font @expo-google-fonts/inter 
```
- Layout
```tsx
import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import { useFonts,  Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter"
import { Loading } from "@/components/loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold})

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Slot />
    </SafeAreaView>
  )
}
```
- tailwind config
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: "Inter_600SemiBold",
        subtitle: "Inter_500Medium",
        body: "Inter_400Regular",
        bold: "Inter_700Bold"
      }
    },
  },
}
```

# Criar componente clicável
```tsx
<TouchableOpacity className="relative" activeOpacity={0.7}>
  <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
    <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
  </View>
  <Feather name="shopping-bag" color={colors.white} size={24}/>
</TouchableOpacity>
```

## Pressable vs TouchableOpacity
- Pressable é componente pra toque, porém não tem efeito visual de opacidade

# Componentes react native
- FlatList
  - lista de elementos
```tsx
<FlatList 
  data={CATEGORIES}
  keyExtractor={(item) => item}
  renderItem={({ item }) => <CategoryButtom title={item} isSelected />}
  horizontal
  contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
  showsHorizontalScrollIndicator={false}
/>
```
- View
  - como se fosse div html
- Text
  - represnta um texto
- Image
  - representa uma imagem
```tsx
<Image source={require("@/assets/logo.png")} />
```
- Pressable vs TouchableOpacity
  - elementos clicaveis