import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

type CategoryProps = {
    selectedCategory: string;
    onChange: (category: string) => void;
}

export function Categories({ selectedCategory, onChange }: CategoryProps) {
    return (
        <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Category
                    name={item.name}
                    icon={item.icon}
                    isSelected={item.name === selectedCategory}
                    onPress={() => onChange(item.name)}
                />
            )}
            horizontal
            style={styles.container}
            contentContainerStyle={styles.content}
            showsHorizontalScrollIndicator={false}
        />
    )
}