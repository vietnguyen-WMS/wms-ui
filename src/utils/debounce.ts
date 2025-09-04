export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 300
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
