declare module 'plotly.js-dist-min' {
  const Plotly: {
    react: (el: HTMLElement, data: unknown[], layout?: unknown, config?: unknown) => Promise<unknown>
    newPlot: (el: HTMLElement, data: unknown[], layout?: unknown, config?: unknown) => Promise<unknown>
    purge: (el: HTMLElement) => void
    relayout: (el: HTMLElement, layout: unknown) => Promise<unknown>
  }
  export default Plotly
}
