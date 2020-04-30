export const scrollToElement = (element: HTMLElement | null, offset: number) => {
  if (!element) return;
  const top = element.getBoundingClientRect().y;
  const height = element.offsetHeight; // @ts-ignore-line
  console.log(height);
  window && window.scrollTo({
    top: window.scrollY + (top - height - offset),
    behavior: "smooth"
  });
}

export const scrollToElementClassName = (className: string, offset: number) => {
  const element = document.getElementsByClassName(className).item(0) as HTMLElement;
  scrollToElement(element, offset);
}

export const scrollToTopestElementClassName = (className: string, offset: number) => {
  const elements = document.getElementsByClassName(className);
  let element = elements.item(0) as HTMLElement;
  if (!element) return;
  if (elements.length < 2) return scrollToElement(element, offset);
  for (let i = 0; i < elements.length; i++) {
    const currentElement = elements.item(i) as HTMLElement;
    const top = currentElement.getBoundingClientRect().y;
    if (top < element.getBoundingClientRect().y) {
      element = currentElement
    }
  }
  scrollToElement(element, offset);
}
