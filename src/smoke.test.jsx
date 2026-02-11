// src/smoke.test.jsx
import React from "react";
test('тестовая среда работает', () => {
  expect(1 + 1).toBe(2);
});

test('React импортируется', () => {
  expect(React).toBeDefined();
});