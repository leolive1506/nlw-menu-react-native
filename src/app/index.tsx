import { CategoryButtom } from "@/components/category-buttom";
import { Header } from "@/components/header";
import { View, FlatList } from "react-native";
import { CATEGORIES } from "@/utils/data/products"
import { useState } from "react";
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  function handleCategorySelect(category: string) {
    setSelectedCategory(category)
  }
  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={4} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CategoryButtom title={item} onPress={() => handleCategorySelect(item)} isSelected={selectedCategory === item} />}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}