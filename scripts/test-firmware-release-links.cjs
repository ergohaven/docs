// Deterministic regression controls; --live also checks GitHub's actual release API
const assert = require('node:assert/strict');
const { parseFirmwareLink, resolveRmk, resolveQmk } = require('../assets/js/firmware-release-links.js');
const models = ['phenom', 'phenom-mini', 'phenom-micro'];
const url = (model, tag) => `https://github.com/ergohaven/rmk/releases/download/${tag}/${model}-${tag}.zip`;
const entries = models.map(model => parseFirmwareLink(url(model, 'v0.3.0')));
assert.deepEqual(entries.map(entry => entry.key), models);
const release = (tag, keys = models, extra = {}) => ({ tag_name: tag, draft: false, prerelease: false, assets: keys.map(model => ({ name: `${model}-${tag}.zip`, state: 'uploaded', size: 123, browser_download_url: url(model, tag) })), ...extra });
const resolved = resolveRmk(entries, [release('v0.2.0'), release('v0.3.0')]);
assert.deepEqual(resolved.map(r => r.tag), models.map(() => 'v0.3.0'));
assert.deepEqual(resolveRmk(entries, [release('v0.4.0', ['phenom']), release('v0.3.0')]).map(r => r.tag), ['v0.4.0', 'v0.3.0', 'v0.3.0']);
assert.deepEqual(resolveRmk(entries, [release('v0.4.0', models, { prerelease: true }), release('v0.3.0')]).map(r => r.tag), models.map(() => 'v0.3.0'));
assert.deepEqual(resolveRmk(entries, [release('v0.4.0', models, { draft: true })]), []);
const malicious = release('v0.3.0'); malicious.assets[0].browser_download_url = 'https://example.com/phenom-v0.3.0.zip';
assert.equal(resolveRmk(entries, [malicious]).length, 2);
const duplicate = release('v0.3.0'); duplicate.assets.push(duplicate.assets[0]);
assert.equal(resolveRmk(entries, [duplicate]).length, 2);
assert.equal(parseFirmwareLink(url('phenom', 'v0.3.0') + '?download=1'), null);
assert.equal(parseFirmwareLink('https://github.com/another/rmk/releases/download/v0.3.0/phenom-v0.3.0.zip'), null);
const k04 = parseFirmwareLink(url('k04', 'v0.1.9'));
assert.equal(resolveRmk([k04], [release('v0.3.0', ['phenom']), release('v0.1.9', ['k04'])])[0].tag, 'v0.1.9');
const qmk = parseFirmwareLink('https://github.com/ergohaven/vial-qmk/releases/download/4.0.6/4.0.6_phenom_v1.uf2');
assert.equal(qmk.key, 'phenom_v1');
assert.equal(resolveQmk([qmk], [{ tag_name: '4.0.6', draft: false, prerelease: false, assets: [{ name: '4.0.6_phenom_v1.uf2', state: 'uploaded', size: 1, browser_download_url: qmk.fallbackUrl }] }])[0].tag, '4.0.6');
console.log('PASS deterministic RMK/QMK release resolver regression controls');
if (process.argv.includes('--live')) {
  (async () => {
    const response = await fetch('https://api.github.com/repos/ergohaven/rmk/releases?per_page=30', { headers: { Accept: 'application/vnd.github+json' } });
    assert.equal(response.status, 200);
    const releases = await response.json();
    const live = resolveRmk(entries, releases);
    assert.equal(live.length, 3);
    for (const model of models) {
      const match = live.find(r => r.entry.key === model);
      assert.equal(match.tag, 'v0.3.0');
      assert.equal(match.asset.browser_download_url, url(model, 'v0.3.0'));
      console.log(`PASS live release API: ${match.asset.browser_download_url}`);
    }
  })().catch(error => { console.error(error); process.exitCode = 1; });
}
