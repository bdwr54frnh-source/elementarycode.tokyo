/* Display aggregate measurements only; no code generation or secret data. */
(() => {
  'use strict';
  const output = document.getElementById('ec-speed-value');
  if (!output) return;
  let receivedAt = null;
  function clear() {
    receivedAt = null;
    output.textContent = '—';
    output.setAttribute('aria-label', '実測値未接続 / No current measurement');
  }
  function record(completedCount, elapsedMs) {
    if (document.hidden || !Number.isSafeInteger(completedCount) || completedCount < 0 ||
        !Number.isFinite(elapsedMs) || elapsedMs <= 0) return;
    const rate = Math.floor(completedCount / elapsedMs * 1000);
    if (!Number.isSafeInteger(rate)) return;
    receivedAt = performance.now();
    output.textContent = rate.toLocaleString('en-US');
    output.setAttribute('aria-label', rate + ' 件/秒');
  }
  clear();
  window.elementarySpeed = Object.freeze({record});
  document.addEventListener('visibilitychange', clear);
  setInterval(() => {
    if (document.hidden || (receivedAt !== null && performance.now() - receivedAt >= 5000)) clear();
  }, 1000);
})();
