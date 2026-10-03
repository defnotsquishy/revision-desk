import assert from 'node:assert/strict';
import { test } from 'node:test';
import { screenShakeAllowed } from '../ui/preferences.ts';

test('screen shake respects both website and device reduced-motion preferences', () => {
  assert.equal(screenShakeAllowed(true, 'system', false), true);
  assert.equal(screenShakeAllowed(false, 'system', false), false);
  assert.equal(screenShakeAllowed(true, 'reduce', false), false);
  assert.equal(screenShakeAllowed(true, 'system', true), false);
  assert.equal(screenShakeAllowed(true, undefined, true), false);
  assert.equal(screenShakeAllowed(true, 'full', true), false);
});
