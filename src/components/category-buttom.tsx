import { Text, Pressable, PressableProps } from "react-native"
import { clsx } from "clsx"
interface CategoryProps extends PressableProps {
  title: string
  isSelected?: boolean
}
export function CategoryButtom({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={
        clsx("bg-slate-800 px-4 justify-center rounded-md h-10", isSelected && "border-2 border-lime-300")
        
      }
      {...rest}
      >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  )
}