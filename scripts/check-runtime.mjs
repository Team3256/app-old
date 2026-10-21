// https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
/** @param {string} version */
export function isSecureNodeVersion(version) {
  const [major = 0, minor = 0, patch = 0] = version.split(".").map(Number);
  return (
    (major === 22 && (minor > 23 || (minor === 23 && patch >= 4))) ||
    (major === 24 && (minor > 22 || (minor === 22 && patch >= 1))) ||
    (major === 26 && (minor > 12 || (minor === 12 && patch >= 1))) ||
    major > 26
  );
}

if (!isSecureNodeVersion(process.versions.node)) {
  throw new Error(
    "Patched Node.js required: ^22.23.4 || ^24.22.1 || >=26.12.1 (eMudhra CA distrust).",
  );
}
