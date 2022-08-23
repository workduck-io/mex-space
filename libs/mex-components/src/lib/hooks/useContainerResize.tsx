import { useEffect, useState } from 'react'

export const useIntersectionContainer = (containerRef) => {
  // const containerRef = useRef(null);
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({})
  const handleIntersection = (entries) => {
    const updatedEntries = {}
    entries.forEach((entry) => {
      const targetid = entry.target.dataset.targetid
      // console.log(entry, targetid);
      if (entry.isIntersecting) {
        updatedEntries[targetid] = true
      } else {
        updatedEntries[targetid] = false
      }
    })

    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries
    }))
  }
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: containerRef.current,
      threshold: 1
    })

    // We are addting observers to child elements of the container div
    // with ref as containerRef. Notice that we are adding observers
    // only if we have the data attribute observerid on the child elemeent
    Array.from(containerRef.current.children).forEach((item: any) => {
      if (item.dataset.targetid) {
        observer.observe(item)
      }
    })
    return () => observer.disconnect()
  }, [])

  return { visibilityMap }
}
