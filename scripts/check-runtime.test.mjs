import assert from "node:assert/strict";
import test from "node:test";

import { isSecureNodeVersion } from "./check-runtime.mjs";

test("rejects runtimes before eMudhra distrust, including retired odd releases", () => {
  for (const version of [
    "18.20.8",
    "20.20.0",
    "22.23.3",
    "23.11.0",
    "24.22.0",
    "25.9.0",
    "26.12.0",
  ]) {
    assert.equal(isSecureNodeVersion(version), false, version);
  }
});

test("accepts the patched floors and later supported releases", () => {
  for (const version of [
    "22.23.4",
    "22.24.0",
    "24.22.1",
    "24.23.0",
    "26.12.1",
    "26.13.0",
    "27.0.0",
  ]) {
    assert.equal(isSecureNodeVersion(version), true, version);
  }
});
