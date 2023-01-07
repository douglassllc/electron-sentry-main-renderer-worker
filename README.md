# electron-sentry-main-renderer-worker

This project demostrates our current working scenario with utilizing Sentry in an Electron application.  This application consist of:

Main - main process (src/background.js)
Renderer - primary renderer UI (src/main.js)
Worker - seperate renderer UI utilized to process data off the main thread and provided a UI for monitoring status (src/worker.js). In our production application there are 1 or more Worker's

Our current issues are covered below.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

## Sentry Issue 1

Select "Create Renderer Error" in the Window titled "Renderer".  This will produce the following output on the console.

```
from sentry.js ...
```

This is coming from the `beforeSend()` function definition in `src/sentry.js`.  However, our expectation would be that the `beforeSend()` in `src\preload.js` should be called.

## Sentry Issue 2

Selectig "Create Worker Error" in the Window titled "Worker" cause the same as Issue 1.  The expectation would be that the `beforeSend() in `src\preload.js` should be called.

```
Module [worker:worker]. Event ID [8ec0c1232251403092f1e87d87f92f3d]. Exception: TypeError: _vm.myUndefinedFunction is not a function
```

## Sentry Issue 3

Select "Crash Worker" in the Window titled "Worker" shows the `module` tag set to `renderer`.  However, in our previous test for Issue 2.  The `module` tag was set correctly to `worker:worker` as expected.

```
Module [renderer]. Event ID [1912563dfbe24c0c925260953f1d0ea4]. Exception: Unknown
```
