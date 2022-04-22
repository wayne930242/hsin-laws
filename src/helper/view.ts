export const timeParser = (value: number): string => {
  const time = new Date(value)
  const MONTH = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  return (
    MONTH[time.getMonth()] + '/' + 
    String(time.getUTCDate()).padStart(2, '0') + '/' +
    time.getFullYear() 
  )
}
