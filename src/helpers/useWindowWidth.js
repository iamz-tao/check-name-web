import { useState, useEffect } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState(NaN)
  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    if (Number.isNaN(width)) {
      handleResize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return width
}

export default useWindowWidth
