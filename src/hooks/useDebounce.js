import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // setTimeout => delay 이후 명령을 수행해라
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);
    
    // value 값에 변화가 생기면 handler의 시간을 초기화
    return () => {
      clearTimeout(handler)
    }

  // value 혹은 delay 값에 변화가 생기면 실행
  }, [value, delay])

  return debouncedValue
  
}
