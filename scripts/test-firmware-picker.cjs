// Run against a real Hugo output: node scripts/test-firmware-picker.cjs <public>
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = process.argv[2];
assert.ok(root, 'Pass the Hugo destination directory');
function findPages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? findPages(name) : name.endsWith('.html') ? [name] : [];
  });
}
const pages = findPages(root).filter(file => fs.readFileSync(file, 'utf8').includes('data-firmware-picker'));
assert.equal(pages.length, 2, 'Both RU and EN picker pages must be rendered');
function element(attributes = '', text = '') {
  // Hugo minification can omit quotes and collapse empty attribute values
  const attrs = Object.fromEntries([...attributes.matchAll(/([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)].map(m => [m[1], m[2] ?? m[3] ?? m[4] ?? '']));
  return {
    dataset: Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith('data-')).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value])),
    hidden: /\bhidden\b/.test(attributes), value: '', textContent: text, id: attrs.id,
    listeners: {}, classList: { add() {}, remove() {} },
    setAttribute(key, value) { attrs[key] = value; }, removeAttribute(key) { delete attrs[key]; },
    scrollIntoView() {}, addEventListener(type, handler) { this.listeners[type] = handler; },
  };
}
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const options = [...html.matchAll(/<button\b([^>]*data-firmware-option\b[^>]*)>([\s\S]*?)<\/button>/g)].map(m => element(m[1], m[2]));
  const devices = [...html.matchAll(/<section\b([^>]*data-firmware-device=[^>]*)>([\s\S]*?)<\/section>/g)].map(m => element(m[1], m[2]));
  const select = html.match(/<select\b([^>]*data-firmware-type\b[^>]*)>([\s\S]*?)<\/select>/);
  assert.ok(select, 'Secondary firmware selector must exist');
  const placeholder = select[2].match(/<option\b([^>]*)>(Choose firmware type|Выберите тип прошивки)<\/option>/);
  assert.ok(placeholder, 'Localized firmware type placeholder must exist');
  assert.match(placeholder[1], /\bvalue(?:=""|='')?(?=\s|$)/, 'Placeholder must have an empty value');
  assert.match(html, /(?:Firmware type|Тип прошивки)<\/label>/);
  const type = element(select[1]);
  const field = element('hidden');
  const result = element('hidden');
  const search = element();
  const single = { '[data-firmware-search]': search, '[data-firmware-options]': element(), '[data-firmware-empty]': element(), '[data-firmware-result]': result, '[data-firmware-type]': type, '[data-firmware-type-field]': field };
  const picker = { matches: () => true, querySelector: key => single[key], querySelectorAll: key => key === '[data-firmware-option]' ? options : devices, contains: () => true };
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('data-firmware-search'));
  vm.runInNewContext(script, { document: { currentScript: { previousElementSibling: picker }, addEventListener() {} }, window: { setTimeout(fn) { fn(); } } });
  assert.equal(result.hidden, true);
  assert.equal(field.hidden, true);
  const choose = value => { const option = options.find(o => o.dataset.firmwareValue === value); assert.ok(option, value); option.listeners.click(); };
  for (const model of ['phenom', 'phenom-mini', 'phenom-micro']) {
    assert.equal(options.filter(o => o.dataset.firmwareValue === model).length, 1);
    choose(model);
    assert.equal(field.hidden, false);
    assert.equal(type.value, '', 'No implicit selection, including after switching models');
    assert.equal(result.hidden, true);
    for (const firmware of ['QMK', 'RMK', 'QMK', '']) {
      type.value = firmware;
      type.listeners.change();
      const visible = devices.filter(d => !d.hidden);
      assert.equal(visible.length, firmware ? 1 : 0);
      assert.equal(result.hidden, !firmware);
      if (!firmware) continue;
      const content = visible[0].textContent;
      assert.match(content, /firmware-picker__instruction/);
      assert.match(content, /<span>(?:Download|Скачать)<\/span>/);
      if (firmware === 'RMK') {
        assert.ok(content.includes(`${model}-v0.3.0.zip`));
        assert.ok(content.includes(`${model.replaceAll('-', '_')}_left.uf2`));
        assert.ok(content.includes(`${model.replaceAll('-', '_')}_right.uf2`));
        assert.ok(!/double-press|дважды быстро/.test(content), 'Do not copy wireless K04 bootloader steps');
      } else {
        assert.ok(content.includes(`4.0.6_${model.replaceAll('-', '_')}_v1.uf2`));
        assert.match(content, /same UF2|один и тот же UF2/);
      }
    }
    type.value = 'RMK'; type.listeners.change();
  }
  for (const option of options.filter(o => !o.dataset.firmwareTypes)) {
    choose(option.dataset.firmwareValue);
    assert.equal(field.hidden, true, 'Other devices must not expose the type selector');
    const visible = devices.filter(d => !d.hidden);
    assert.equal(visible.length, 1);
    assert.equal(visible[0].dataset.firmwareDevice, option.dataset.firmwareValue);
    assert.match(visible[0].textContent, /firmware-picker__instruction/);
  }
  choose('qmk-sm62');
  assert.equal(field.hidden, true, 'SM62 is QMK-only');
  const sm62 = devices.find(d => !d.hidden);
  assert.equal(sm62.dataset.firmwareDevice, 'qmk-sm62');
  assert.ok(sm62.textContent.includes('4.2.0_sm62_v1.uf2'));
  assert.match(sm62.textContent, /other half|второй половинки/);
  choose('rmk-k04');
  assert.equal(field.hidden, true);
  assert.equal(devices.filter(d => !d.hidden).length, 1);
  assert.match(devices.find(d => !d.hidden).textContent, /k04-v0.1.9.zip/);
  search.value = 'Phenom'; search.listeners.input();
  assert.equal(result.hidden, true);
  assert.equal(field.hidden, true);
  console.log(`PASS rendered picker + selection transitions: ${page}`);
}
