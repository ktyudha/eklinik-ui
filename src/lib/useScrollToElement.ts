declare global {
  interface Window {
    scrolled?: boolean
  }
}

export default function useScrollToElement(
  element: EventTarget & HTMLFormElement,
  offset: number = 250
) {
  function isFullVisible(element: EventTarget & HTMLFormElement, offset: number = 0) {
    const elementRect = element.getBoundingClientRect()
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
    const isTopVisible = elementRect.top >= offset && elementRect.top < windowHeight
    const isBottomVisible = elementRect.bottom >= offset && elementRect.bottom <= windowHeight
    const fullVisible = isTopVisible && isBottomVisible

    return fullVisible
  }

  function run(element: EventTarget & HTMLFormElement, offset: number = 250) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const alreadyRunt = window.scrolled

    if (alreadyRunt) {
      return
    } else {
      window.scrolled = true
      setTimeout(() => delete window["scrolled"], 300)
    }

    if (isFullVisible(element, offset)) {
      element?.focus()
      return
    }

    window.scroll({
      top: elementPosition - offset - 1,
      behavior: "smooth",
    })

    window.addEventListener("scroll", function scrollHandler() {
      const fullVisible = isFullVisible(element, 0)

      if (fullVisible) {
        window.removeEventListener("scroll", scrollHandler)
        element?.focus()
      }
    })
  }

  return run(element, offset)
}