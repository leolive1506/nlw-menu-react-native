# Composição de componente
```tsx
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
}

interface ButtonTextProps {
  children: ReactNode
}

interface ButtonIconProps {
  children: ReactNode
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-black font-heading text-base mx-2">
      {children}
    </Text>
  )
}

function ButtonIcon({ children }: ButtonTextProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon
export { Button }
```
```tsx
<Button>
  <Button.Icon>
    <Feather name="plus-circle" size={20} />
  </Button.Icon>
  <Button.Text>Adicionar ao pedido</Button.Text>
</Button>
```

# Trabalhando com estados globais
## [Lib zustand](https://zustand-demo.pmnd.rs/)
```tsx
import { create } from "zustand"
import * as cartInMemory from "./helpers/cart-in-memory"

export const useCartStore = create<StateProps>(set => ({
  products: [],
  add: (product: ProductProps) => set((state) => ({
    products: cartInMemory.add(state.products, product)
  }))
}))
// use: const cartStore = useCartStore()
```

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

# Rotas
- dentro app 
  - product/[id].tsx
```tsx
import { View } from "react-native";
import { useLocalSearchParams } from 'expo-router'

export default function Product() {
  const { id } = useLocalSearchParams()
  return (
    <View className="flex-1">

    </View>
  )
}
```
- link para navegar
```tsx
 <Link href={`/product/${item.id}`} asChild>
  <Product data={item} />
</Link>
```
- componente usado como link
```tsx
import { forwardRef } from "react";
export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref
) => {
  return (
    <TouchableOpacity ref={ref} className="w-full flex-row items-center pb-4" {...rest}>
    </TouchableOpacity>
  )
})
```
- redirecionar
```tsx
import { useLocalSearchParams, useNavigation, Redirect } from 'expo-router'
const navigation = useNavigation()
// 1. forma
if (!product) {
  return <Redirect href="/" />
}

// 2. form
function handleAddToCart() {
  cartStore.add(product)
  navigation.goBack()
}
```
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

- SectionList
  - seção de elementos
```tsx
<SectionList 
  ref={sectionListRef}
  sections={MENU}
  keyExtractor={(item) => item.id}
  stickySectionHeadersEnabled={false}
  renderSectionHeader={({ section: { title } }) => <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>}
  renderItem={({ item }) => <Product data={item} />}
  className="flex-1 p-5"
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 100 }}
/>
```

# Dicar gerais
- ao clicar input, android empurra tela pra cima, mas nem sempre IOS consegue fazer isso
```sh
npm i react-native-keyboard-aware-scroll-view --save
```

# [Expo asyn storage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- Armazenar dados no aparelho
```sh
npx expo install @react-native-async-storage/async-storage
```
```tsx
// persist -> mesmo se fechar ou recarregar informação ficar no carrinho
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
export const useCartStore = create(
  persist<StateProps>(
    set => ({
    products: [],
    add: (product: ProductProps) => set((state) => ({
      products: cartInMemory.add(state.products, product)
    })),
    remove: (productId: string) => set((state) => ({
      products: cartInMemory.remove(state.products, productId)
    }))
}), {
  name: "nlw-experts:cart",
  storage: createJSONStorage(() => AsyncStorage)
}))
```