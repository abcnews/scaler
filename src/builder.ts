import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';

let appMountEl: Mount;
let appProps;

let vizElem;

Promise.all([
  whenOdysseyLoaded,
]).then(() => {
  [appMountEl] = selectMounts('index');

  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl));
    const props = { };
    vizElem = new App({
      target: appMountEl,
      props,
    });
  }

});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-builder] public path: ${__webpack_public_path__}`);
}
