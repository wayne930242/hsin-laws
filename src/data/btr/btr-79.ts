import { TypeData, TypeFlashCard } from '../interface'

const id = 'btr-79'

const name = '技規 #79 防火構造物的防火區劃'

const head: TypeData[][] = [
  ['', '總FA每[1500]m²', '有自動滅火--[3000]m²']
]

const data: TypeData[][] = [
  ['依面積([1hr防火 1hr阻熱])', '交接處 牆', '突出[50]公分', '長度[90]公分'],
  ['^', '^', '[帷幕牆同]', '<'],
  ['依用途([1hr防火 1hr阻熱])', 'X觀眾席', '[集會表演A1]', '<'],
  ['^', '^', '[文教設施D2]', '<'],
  ['^', 'X[工廠生產線]', '<', '<'],
  ['^', 'X[教室]', '[國小校舍D3]', '<'],
  ['^', '^', '[校舍D4]', '<'],
  ['^', 'X[空間太寬]', '[體育館]', '<'],
  ['^', '^', '[零售市場]', '<'],
  ['^', '^', '[停車空間]', '<'],
  ['豎道([1hr防火])', '[昇降機道]', '[遮煙]', '<'],
  ['^', '^', '[併昇降機間]', '[出入口遮煙自動關閉]'],
  ['^', '挑空', 'X[避難層直上]', '且[天花 耐燃一級]'],
  ['^', '^', '[直下]', '[牆]'],
  ['^', '^', 'X[連跨三層內]', '且 FA[1500]m²內'],
  ['^', '管道間', '[維修門 1hr 防火]', '+[遮煙]'],
  ['^', '[安全梯樓梯間]', '<', '<'],
  ['樓層交接', '交接處 牆', '突出[50]公分', '長度[90]公分'],
  ['^', '^', '[帷幕牆同]', '<'],
  ['高層11F以上([1hr防火 1hr阻熱])', '面積[100]m²', 'FA每[100]m²', '[200]'],
  ['^', '^', '住宅：[200]m²', '[400]'],
  ['^', '[1.2]m以上，耐燃[一]級', '住宅：[200]m²', '[400]'],
  ['^', '^', '住宅：[400]m²', '[800]'],
  ['^', '[全耐燃一級]', '住宅：[500]m²', '[1000]'],
]

export const Flashcard: TypeFlashCard = {
  id,
  name,
  head,
  data,
}
