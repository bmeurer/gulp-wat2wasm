gulp-wat2wasm
=============

**gulp-wat2wasm** is a wrapper around [wabt.js](https://github.com/AssemblyScript/wabt.js) allowing to compile WebAssembly `.wat` files into `.wasm` files, similar to the `wat2wasm` command line tool.

Usage
-----

```
$> npm install gulp-wat2wasm
```

In your `Gulpfile.js` you can just hook it up like this:

```js
const wat2wasm = require('gulp-wat2wasm');

// Post-MVP WebAssembly features to legalize.
const features = {
  exceptions: false,       // Exception handling
  mutable_globals: false,  // Import/Export mutable globals
  sat_float_to_int: false, // Non-trapping Float-to-int Conversions
  sign_extension: false,   // Sign-extension operators
  simd: false,             // 128-bit packed operators
  threads: false,          // Threading
  multi_value: false,      // Multi-value
  tail_call: false,        // Tail Call
  bulk_memory: false,      // Bulk Memory Operations and Conditional Segment Initialization
  reference_types: false,  // Reference Types
  annotations: false       // Custom Annotation Syntax for the Wasm Text Format
};

// Options modifying the behavior of the binary generation.
const options = {
  canonicalize_lebs: false, // Write all LEB128 sizes as 5-bytes instead of their minimal size
  relocatable: false,       // Create a relocatable wasm binary (suitable for linking with e.g. lld)
  write_debug_names: false  // Write debug names to the generated binary file
};

const wasmTask = () => src('./src/*.wat').pipe(wat2wasm(features, options)).pipe(dest('./dst'));
```

License
-------

Copyright [Benedikt Meurer](https://github.com/bmeurer), Licensed under [Apache-2.0](https://github.com/bmeurer/gulp-wat2wasm/blob/master/LICENSE).
