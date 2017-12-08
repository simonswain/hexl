function hexl (_b, caption) {
  let b = _b;

  if (!Buffer.isBuffer(_b)) {
    b = new Buffer.from(_b, 'ascii');
  }

  let s = [];

  if (caption) {
    s.push('-----------------------------------------');
    s.push(caption);
  }

  s.push('-----------------------------------------');

  let i, ii, addr;

  let vals = [];
  let chars = [];

  for (i = 0, ii = b.length; i < ii; i++) {
    addr = (i - 7).toString(16);
    while (addr.length < 4) {
      addr = '0' + addr;
    }

    if (b[i] > 31 && b[i] < 127) {
      chars.push(String.fromCharCode(b[i]));
    } else {
      chars.push('.');
    }

    let hex = b[i].toString(16);
    while (hex.length < 2) {
      hex = '0' + hex;
    }
    vals.push(hex);

    if (i > 0 && (i + 1) % 8 === 0) {
      s.push(addr + ' | ' + vals.join(' ') + ' | ' + chars.join(''));
      chars = [];
      vals = [];
    }
  }

  i = i % 8;

  if (i > 0) {
    while (i < 8) {
      chars.push(' ');
      vals.push('  ');
      i++;
    }
    s.push(addr + ' | ' + vals.join(' ') + ' | ' + chars.join(''));
  }

  s.push('-----------------------------------------');
  s.push();

  return s.join('\n');
}

module.exports = {
  hexl: hexl,
  log: (_b, caption) => {
    console.log(hexl(_b, caption));
  }
};
