export interface Good {
  id: number
  name: string
  price: number
  main_image: string
}

// Добавляй сюда другие коллекции по мере необходимости
export interface Schema {
  goods: Good[]
}
