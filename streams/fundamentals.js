/*
  Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.

  Pipe -> way of forwarding information.
    process.stdin.pipe(process.stdout);
*/

import { Readable, Writable, Transform } from 'stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformedChunk)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString() * 10));
    callback();
  }
}

// const oneToHundredStream = new OneToHundredStream();
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());