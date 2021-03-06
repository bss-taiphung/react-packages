Package.describe({
  name: 'babel-tests',
  summary: "Tests for the babel package",
  version: '0.1.0',
  documentation: 'README.md'
});

// These tests are in their own package because putting them in the
// `babel` package would create a build-time circular dependency.  A
// package containing transpiled files can only be built after `babel`
// is already built.


Package.onUse(function (api) {
  // If you want access to some of the test case data, you can "use"
  // this package.  The running happens from onTest.
  api.export('BabelTests');

  api.versionsFrom('METEOR@1.1.0.2');
  api.use('jsx@0.1.0');
  api.use('underscore');

  // Tests that call the transpiler (which is only possible on the server)
  // and look at the result.  We could put these in a JS file, but
  // multiline strings are so darn useful!
  api.addFiles('transpile-tests.jsx');
});

Package.onTest(function (api) {
  api.versionsFrom('METEOR@1.1.0.2');
  api.use('tinytest');
  api.use('underscore');
  api.use('babel-compiler@5.4.7', 'server');
  api.use('babel-tests');
  api.use('jsx@0.1.0');

  // See comment on transpile-tests.jsx above.
  api.addFiles('transpile-tests-runner.jsx', 'server');

  // Tests of runtime behavior.  These confirm that the runtime library
  // is functioning correctly, among other things.
  api.addFiles('runtime-tests.jsx', ['server', 'client']);
});
