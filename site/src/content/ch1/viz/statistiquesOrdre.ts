import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, exponential, uniform, normal, type Rng } from '../../../sim/rng'
import { histogram, linspace, expPdf, expCdf, normalPdf, normalCdf, betaPdf, lgamma, mean } from '../../../sim/stats'

type Law = 'unif' | 'exp' | 'gauss'

interface LawSpec {
  label: string
  tex: string
  pdf: (x: number) => number
  cdf: (x: number) => number
  draw: (rng: Rng) => number
  range: [number, number]
}

const LAWS: Record<Law, LawSpec> = {
  unif: { label: 'U([0, 2])', tex: '\\mathcal{U}([0,2])', pdf: (x) => (x >= 0 && x <= 2 ? 0.5 : 0), cdf: (x) => Math.min(1, Math.max(0, x / 2)), draw: (r) => uniform(r, 0, 2), range: [0, 2] },
  exp: { label: 'E(1)', tex: '\\mathcal{E}(1)', pdf: (x) => expPdf(x, 1), cdf: (x) => expCdf(x, 1), draw: (r) => exponential(r, 1), range: [0, 7] },
  gauss: { label: 'N(0, 1)', tex: '\\mathcal{N}(0,1)', pdf: (x) => normalPdf(x), cdf: (x) => normalCdf(x), draw: (r) => normal(r), range: [-4, 4] },
}

/** Statistiques d'ordre : histogramme de X_{(k)} vs densite n!/((k-1)!(n-k)!) F^{k-1}(1-F)^{n-k} f ; loi Beta de F(X_{(k)}) ; espacements exponentiels. */
export const vizStatistiquesOrdre: Viz = {
  id: 'ch1-statistiques-ordre',
  title: 'Statistiques d’ordre : loi de X₍ₖ₎, du maximum, et F(X₍ₖ₎) ~ Beta(k, n−k+1)',
  description:
    'On trie $n$ observations i.i.d. et on garde la $k$-ième, $X_{(k)}$ ($k=n$ : le maximum, Ex. 1.13). À gauche : histogramme de $X_{(k)}$ sur $M=3000$ échantillons et la densité $\\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}(1-F(x))^{n-k}f(x)$ obtenue en intégrant la densité jointe $n!\\prod_if(y_i)\\mathbb{1}_{\\{y_1<\\dots<y_n\\}}$. À droite : histogramme de $F(X_{(k)})$ et densité $\\mathrm{Beta}(k,n-k+1)$ (Examen 2025 Ex. 3 Q6). Pour la loi exponentielle, l’option « espacements » montre que $Z_k=(n-k+1)(X_{(k)}-X_{(k-1)})$ a la loi de $X_1$ (PC3 Ex. 5).',
  source: 'Poly ch.1, Ex. 1.8 et Ex. 1.13 ; PC3 Ex. 5 ; CC 2022 Ex. 3 ; Examen 2025 Ex. 3 Q6',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let law: Law = 'unif'
    let n = 5
    let k = 5
    let spacing = false
    let seed = 5
    const M = 3000
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let kSlider: ReturnType<typeof slider> | null = null

    const draw = () => {
      const spec = LAWS[law]
      const kk = Math.min(k, n)
      const rng = makeRng(700 + seed)
      const vals = new Array<number>(M)
      const us = new Array<number>(M)
      const spacings = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        const xs = Array.from({ length: n }, () => spec.draw(rng)).sort((u, v) => u - v)
        vals[m] = xs[kk - 1]
        us[m] = spec.cdf(xs[kk - 1])
        spacings[m] = (n - kk + 1) * (xs[kk - 1] - (kk >= 2 ? xs[kk - 2] : 0))
      }
      const logC = lgamma(n + 1) - lgamma(kk) - lgamma(n - kk + 1)
      const dens = (x: number) => {
        const F = spec.cdf(x)
        const f = spec.pdf(x)
        if (f === 0) return 0
        return Math.exp(logC + (kk - 1) * Math.log(Math.max(F, 1e-300)) + (n - kk) * Math.log(Math.max(1 - F, 1e-300))) * f
      }
      if (spacing && law === 'exp') {
        const [lo, hi] = [0, 7]
        const h = histogram(spacings, 40, lo, hi)
        const grid = linspace(lo + 1e-6, hi, 300)
        hLeft.update([barTrace(h.centers, h.density, `histogramme de Z_${kk} = (n−k+1)(X₍ₖ₎ − X₍ₖ₋₁₎)`, COLORS.blue, { width: h.width }), lineTrace(grid, grid.map((x) => expPdf(x, 1)), 'densité E(1) de X₁', COLORS.orange)], {
          title: `Espacement normalisé Z_${kk}, n = ${n} (loi E(1))`,
          xaxis: { title: 'z', range: [lo, hi] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
        })
      } else {
        const [lo, hi] = spec.range
        const h = histogram(vals, 40, lo, hi)
        const grid = linspace(lo + 1e-6, hi - 1e-6, 400)
        hLeft.update([barTrace(h.centers, h.density, `histogramme de X₍${kk}₎`, COLORS.blue, { width: h.width }), lineTrace(grid, grid.map(dens), 'densité théorique de X₍ₖ₎', COLORS.orange)], {
          title: `X₍${kk}₎ pour n = ${n}, loi ${spec.label}${kk === n ? ' (maximum)' : kk === 1 ? ' (minimum)' : ''}`,
          xaxis: { title: 'x', range: [lo, hi] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
        })
      }
      const hU = histogram(us, 30, 0, 1)
      const gridU = linspace(0.002, 0.998, 300)
      hRight.update([barTrace(hU.centers, hU.density, `histogramme de F(X₍${kk}₎)`, COLORS.green, { width: hU.width }), lineTrace(gridU, gridU.map((u) => betaPdf(u, kk, n - kk + 1)), `densité Beta(${kk}, ${n - kk + 1})`, COLORS.orange)], {
        title: `F(X₍${kk}₎) ~ Beta(k, n−k+1), espérance k/(n+1) = ${(kk / (n + 1)).toFixed(3)}`,
        xaxis: { title: 'u', range: [0, 1] },
        yaxis: { title: 'densité' },
        barmode: 'overlay',
      })
      const extra =
        law === 'unif' && kk === n
          ? ` **Exemple 1.13** : pour $\\mathcal{U}([0,\\theta])$ avec $\\theta=2$, $\\mathbb{P}_\\theta(X_{(n)}\\le t)=(t/\\theta)^n$ et la densité du maximum est $q_{n,\\theta}(t)=\\frac{nt^{n-1}}{\\theta^n}\\mathbb{1}_{[0,\\theta]}(t)$ : le modèle induit par $X_{(n)}$ est $(\\mathbb{R},\\mathcal{B}(\\mathbb{R}),\\{q_{n,\\theta}\\cdot\\mathrm{Leb},\\theta>0\\})$ ; $\\mathbb{E}_\\theta[X_{(n)}]=\\frac{n}{n+1}\\theta=${((n / (n + 1)) * 2).toFixed(3)}$ (moyenne observée $${mean(vals).toFixed(3)}$).`
          : law === 'exp' && spacing
            ? ` **PC3 Ex. 5 Q2** : les espacements normalisés $Z_1=nX_{(1)}$, $Z_k=(n-k+1)(X_{(k)}-X_{(k-1)})$ sont **i.i.d. de même loi que $X_1$** (changement de variables de jacobien $n!$ dans la densité jointe, puis $\\sum_k\\sum_{j\\le k}\\frac{z_j}{n-j+1}=\\sum_jz_j$). Les $X_{(k)}$ eux-mêmes ne sont pas indépendants. C’est le même calcul que CC 2022 Ex. 3 Q3 (exponentielle translatée).`
            : ` Pour $k=1$ (minimum) et la loi exponentielle, $nX_{(1)}$ a la loi de $X_1$ ; pour $k=n$ (maximum), $\\mathbb{P}(X_{(n)}\\le t)=F(t)^n$ par indépendance (Ex. 1.13).`
      info.innerHTML = richToHtml(
        `**Statistiques d’ordre** $X_{(1)}\\le\\dots\\le X_{(n)}$ (Ex. 1.8 : applications 1-lipschitziennes pour $\\|\\cdot\\|_\\infty$, donc des statistiques). Pour $n$ observations i.i.d. de densité $f$ et f.d.r. $F$, la densité jointe du vecteur ordonné est $n!\\prod_{i=1}^nf(y_i)\\mathbb{1}_{\\{y_1<\\dots<y_n\\}}$ (échangeabilité : $n!$ permutations équiprobables, pas d’ex-aequo p.s.) ; en intégrant les autres coordonnées, $X_{(k)}$ a pour densité $\\frac{n!}{(k-1)!(n-k)!}F^{k-1}(1-F)^{n-k}f$ (courbe orange, ici $k=${kk}$, $n=${n}$, loi $${spec.tex}$). À droite, $F(X_{(k)})\\sim\\mathrm{Beta}(k,n-k+1)$ : c’est la $k$-ième statistique d’ordre de $n$ uniformes, d’espérance $k/(n+1)$ (observée : $${mean(us).toFixed(3)}$) — l’argument de l’Examen 2025 Ex. 3 Q6 (au moins $k$ observations dans un ensemble $\\iff$ une binomiale $\\ge k$).${extra}`,
      )
    }

    const rebuildK = () => {
      const s = slider({ label: '$k$ (rang)', min: 1, max: n, step: 1, value: Math.min(k, n), onChange: (v) => { k = v; draw() } })
      if (kSlider) controls.replaceChild(s.root, kSlider.root)
      else controls.append(s.root)
      kSlider = s
    }

    controls.append(
      segmented<Law>(
        (Object.keys(LAWS) as Law[]).map((kx) => ({ value: kx, label: LAWS[kx].label })),
        law,
        (v) => {
          law = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 2,
        max: 30,
        step: 1,
        value: n,
        onChange: (v) => {
          const wasMax = k === n
          n = v
          if (wasMax || k > n) k = n
          rebuildK()
          draw()
        },
      }).root,
    )
    rebuildK()
    controls.append(toggle('espacements normalisés $Z_k$ (loi exponentielle)', spacing, (v) => { spacing = v; if (v) law = 'exp'; draw() }))
    controls.append(button('Tirer 3000 échantillons', () => { seed++; draw() }))
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
