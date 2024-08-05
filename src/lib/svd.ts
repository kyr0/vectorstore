// experimental SVD (Singular Value Decomposition) implementation

export function transpose(A: Array<Array<number>>): Array<Array<number>> {
  const ret: Array<Array<number>> = [];
  const n = A.length;

  for (let i = 0; i < n; i++) {
      const Ai = A[i];
      for (let j = 0; j < Ai.length; j++) {
          if (typeof ret[j] !== "object") {
              ret[j] = [];
          }
          ret[j][i] = Ai[j];
      }
  }
  return ret;
}

export function dotMM(A: Array<Array<number>>, B: Array<Array<number>>): Array<Array<number>> {
  const p = A.length;
  const BT = transpose(B);
  const r = BT.length;
  const ret: Array<Array<number>> = Array(p);

  for (let i = 0; i < p; i++) {
      const reti: Array<number> = [];
      const Ai = A[i];
      for (let k = 0; k < r; k++) {
          let accum = 0;
          const BTk = BT[k];
          for (const j in Ai) {
              if (Ai.hasOwnProperty(j) && BTk.hasOwnProperty(j)) {
                  accum += Ai[j] * BTk[j];
              }
          }
          if (accum) reti[k] = accum;
      }
      ret[i] = reti;
  }
  return ret;
}

export function dotMV(A: Array<Array<number>>, x: Array<number>): Array<number> {
  const p = A.length;
  const ret: Array<number> = Array(p);

  for (let i = 0; i < p; i++) {
      const Ai = A[i];
      let accum = 0;
      for (const j in Ai) {
          if (Ai.hasOwnProperty(j) && x[j] !== undefined) {
              accum += Ai[j] * x[j];
          }
      }
      if (accum) ret[i] = accum;
  }
  return ret;
}

export function dotVM(x: Array<number>, A: Array<Array<number>>): Array<number> {
  const ret: Array<number> = [];

  for (const i in x) {
      if (x.hasOwnProperty(i)) {
          const Ai = A[i];
          const alpha = x[i];
          for (const j in Ai) {
              if (Ai.hasOwnProperty(j)) {
                  if (!ret[j]) ret[j] = 0;
                  ret[j] += alpha * Ai[j];
              }
          }
      }
  }
  return ret;
}

export function dotVV(x: Array<number>, y: Array<number>): number {
  let ret = 0;
  for (const i in x) {
      if (x.hasOwnProperty(i) && y[i] !== undefined) {
          ret += x[i] * y[i];
      }
  }
  return ret;
}

export function dot(A: any, B: any): any {
  const m = dim(A).length;
  const n = dim(B).length;
  const k = m * 1000 + n;

  switch (k) {
      case 0:
          return A * B;
      case 1001:
          return dotVV(A, B);
      case 2001:
          return dotMV(A, B);
      case 1002:
          return dotVM(A, B);
      case 2002:
          return dotMM(A, B);
      default:
          throw new Error(`dot not implemented for tensors of order ${m} and ${n}`);
  }
}

export function diag(d: Array<number>): Array<Array<number>> {
  const n = d.length;
  const ret: Array<Array<number>> = Array(n);

  let i: number;
  for (let i = n - 1; i >= 1; i -= 2) {
      const i1 = i - 1;
      ret[i] = [];
      ret[i][i] = d[i];
      ret[i1] = [];
      ret[i1][i1] = d[i1];
  }
  if (i === 0) {
      ret[0] = [];
      ret[0][0] = d[i];
  }
  return ret;
}

export function dim(A: any, ret: Array<number> = [], k: number = 0): Array<number> {
  if (typeof A !== "object") return ret;
  if (!(k in ret)) ret[k] = 0;
  if (A.length > ret[k]) ret[k] = A.length;

  for (const i in A) {
      if (A.hasOwnProperty(i)) dim(A[i], ret, k + 1);
  }
  return ret;
}

export function clone(A: any, k: number = 0, n: number = dim(A).length): any {
  const ret = Array(A.length);

  if (k === n - 1) {
      for (const i in A) {
          if (A.hasOwnProperty(i)) ret[i] = A[i];
      }
      return ret;
  }

  for (const i in A) {
      if (A.hasOwnProperty(i)) ret[i] = clone(A[i], k + 1, n);
  }
  return ret;
}
export function rep(s: Array<number>, v: any, k: number = 0): any {
  const n = s[k];
  const ret = Array(n);

  if (k === s.length - 1) {
    let i: number;
    for (i = n - 2; i >= 0; i -= 2) {
      ret[i + 1] = v;
      ret[i] = v;
    }
    if (i === -1) ret[0] = v;
    return ret;
  }

  for (let i = n - 1; i >= 0; i--) {
    ret[i] = rep(s, v, k + 1);
  }
  return ret;
}

// Singular Value Decomposition (SVD)
export function svd(A: Array<Array<number>>): { U: Array<Array<number>>, S: Array<number>, V: Array<Array<number>> } {
  let temp;
  const prec = 2.220446049250313e-16; // numeric.epsilon; //Math.pow(2,-52) // assumes double prec
  const tolerance = 1.e-64 / prec;
  const itmax = 50;
  let c = 0;
  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;

  const u = clone(A);
  const m = u.length;
  const n = u[0].length;

  if (m < n) throw "Need more rows than columns";

  const e = new Array(n).fill(0);
  const q = new Array(n).fill(0);
  const v = rep([n, n], 0);

  function pythag(a: number, b: number): number {
      a = Math.abs(a);
      b = Math.abs(b);
      if (a > b) {
          return a * Math.sqrt(1.0 + (b * b) / (a * a));
      } else if (b == 0.0) {
          return a;
      }
      return b * Math.sqrt(1.0 + (a * a) / (b * b));
  }

  let f = 0.0;
  let g = 0.0;
  let h = 0.0;
  let x = 0.0;
  let y = 0.0;
  let z = 0.0;
  let s = 0.0;

  for (i = 0; i < n; i++) {
      e[i] = g;
      s = 0.0;
      l = i + 1;
      for (j = i; j < m; j++) {
          s += u[j][i] * u[j][i];
      }
      if (s <= tolerance) {
          g = 0.0;
      } else {
          f = u[i][i];
          g = Math.sqrt(s);
          if (f >= 0.0) g = -g;
          h = f * g - s;
          u[i][i] = f - g;
          for (j = l; j < n; j++) {
              s = 0.0;
              for (k = i; k < m; k++) {
                  s += u[k][i] * u[k][j];
              }
              f = s / h;
              for (k = i; k < m; k++) {
                  u[k][j] += f * u[k][i];
              }
          }
      }
      q[i] = g;
      s = 0.0;
      for (j = l; j < n; j++) {
          s = s + u[i][j] * u[i][j];
      }
      if (s <= tolerance) {
          g = 0.0;
      } else {
          f = u[i][i + 1];
          g = Math.sqrt(s);
          if (f >= 0.0) g = -g;
          h = f * g - s;
          u[i][i + 1] = f - g;
          for (j = l; j < n; j++) {
              e[j] = u[i][j] / h;
          }
          for (j = l; j < m; j++) {
              s = 0.0;
              for (k = l; k < n; k++) {
                  s += u[j][k] * u[i][k];
              }
              for (k = l; k < n; k++) {
                  u[j][k] += s * e[k];
              }
          }
      }
      y = Math.abs(q[i]) + Math.abs(e[i]);
      if (y > x) {
          x = y;
      }
  }

  // accumulation of right hand transformations
  for (i = n - 1; i !== -1; i--) {
      if (g !== 0.0) {
          h = g * u[i][i + 1];
          for (j = l; j < n; j++) {
              v[j][i] = u[i][j] / h;
          }
          for (j = l; j < n; j++) {
              s = 0.0;
              for (k = l; k < n; k++) {
                  s += u[i][k] * v[k][j];
              }
              for (k = l; k < n; k++) {
                  v[k][j] += s * v[k][i];
              }
          }
      }
      for (j = l; j < n; j++) {
          v[i][j] = 0;
          v[j][i] = 0;
      }
      v[i][i] = 1;
      g = e[i];
      l = i;
  }

  // accumulation of left hand transformations
  for (i = n - 1; i !== -1; i--) {
      l = i + 1;
      g = q[i];
      for (j = l; j < n; j++) {
          u[i][j] = 0;
      }
      if (g !== 0.0) {
          h = u[i][i] * g;
          for (j = l; j < n; j++) {
              s = 0.0;
              for (k = l; k < m; k++) {
                  s += u[k][i] * u[k][j];
              }
              f = s / h;
              for (k = i; k < m; k++) {
                  u[k][j] += f * u[k][i];
              }
          }
          for (j = i; j < m; j++) {
              u[j][i] = u[j][i] / g;
          }
      } else {
          for (j = i; j < m; j++) {
              u[j][i] = 0;
          }
      }
      u[i][i] += 1;
  }

  // diagonalization of the bidiagonal form
  for (k = n - 1; k !== -1; k--) {
      for (let iteration = 0; iteration < itmax; iteration++) {
          let test_convergence = false;
          for (l = k; l !== -1; l--) {
              if (Math.abs(e[l]) <= prec) {
                  test_convergence = true;
                  break;
              }
              if (Math.abs(q[l - 1]) <= prec) {
                  break;
              }
          }

          if (!test_convergence) {
              c = 0.0;
              s = 1.0;
              const l1 = l - 1;
              for (i = l; i < k + 1; i++) {
                  f = s * e[i];
                  e[i] = c * e[i];
                  if (Math.abs(f) <= prec) {
                      break;
                  }
                  g = q[i];
                  h = pythag(f, g);
                  q[i] = h;
                  c = g / h;
                  s = -f / h;
                  for (j = 0; j < m; j++) {
                      y = u[j][l1];
                      z = u[j][i];
                      u[j][l1] = y * c + z * s;
                      u[j][i] = -y * s + z * c;
                  }
              }
          }

          z = q[k];
          if (l == k) {
              if (z < 0.0) {
                  q[k] = -z;
                  for (j = 0; j < n; j++) {
                      v[j][k] = -v[j][k];
                  }
              }
              break;
          }

          if (iteration >= itmax - 1) {
              throw new Error('Error: no convergence.');
          }

          x = q[l];
          y = q[k - 1];
          g = e[k - 1];
          h = e[k];
          f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2.0 * h * y);
          g = pythag(f, 1.0);
          if (f < 0.0) {
              f = ((x - z) * (x + z) + h * (y / (f - g) - h)) / x;
          } else {
              f = ((x - z) * (x + z) + h * (y / (f + g) - h)) / x;
          }

          c = 1.0;
          s = 1.0;
          for (i = l + 1; i < k + 1; i++) {
              g = e[i];
              y = q[i];
              h = s * g;
              g = c * g;
              z = pythag(f, h);
              e[i - 1] = z;
              c = f / z;
              s = h / z;
              f = x * c + g * s;
              g = -x * s + g * c;
              h = y * s;
              y = y * c;
              for (j = 0; j < n; j++) {
                  x = v[j][i - 1];
                  z = v[j][i];
                  v[j][i - 1] = x * c + z * s;
                  v[j][i] = -x * s + z * c;
              }
              z = pythag(f, h);
              q[i - 1] = z;
              c = f / z;
              s = h / z;
              f = c * g + s * y;
              x = -s * g + c * y;
              for (j = 0; j < m; j++) {
                  y = u[j][i - 1];
                  z = u[j][i];
                  u[j][i - 1] = y * c + z * s;
                  u[j][i] = -y * s + z * c;
              }
          }
          e[l] = 0.0;
          e[k] = f;
          q[k] = x;
      }
  }

  for (i = 0; i < q.length; i++) {
      if (q[i] < prec) q[i] = 0;
  }

  // sort eigenvalues
  for (i = 0; i < n; i++) {
      for (j = i - 1; j >= 0; j--) {
          if (q[j] < q[i]) {
              c = q[j];
              q[j] = q[i];
              q[i] = c;
              for (k = 0; k < u.length; k++) {
                  temp = u[k][i];
                  u[k][i] = u[k][j];
                  u[k][j] = temp;
              }
              for (k = 0; k < v.length; k++) {
                  temp = v[k][i];
                  v[k][i] = v[k][j];
                  v[k][j] = temp;
              }
              i = j;
          }
      }
  }

  return { U: u, S: q, V: v };
}
