import { useState, useRef } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";
import { CategoryButtom } from "@/components/category-buttom";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { CATEGORIES, MENU } from "@/utils/data/products"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const sectionListRef = useRef<SectionList>(null)

  function handleCategorySelect(newCategorySelected: string) {
    setSelectedCategory(newCategorySelected)
    const sectionIndex = CATEGORIES.findIndex((category) => category === newCategorySelected)
    
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
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

      <SectionList 
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}