import acto from '@abcnews/alternating-case-to-object';
import type { SvelteComponent } from 'svelte';

import { encode, decode } from '@abcnews/base-36-props';
import { proxy } from '@abcnews/dev-proxy';
import { whenDOMReady, whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';

import { loadScaler } from './components/Scrollyteller';

import ScrollyWrapper from './components/ScrollyWrapper.svelte';

const mountComponents = (name: string, Component: typeof SvelteComponent, props?: any) =>
  selectMounts(name).forEach(
    mountEl => {
      if (name === 'mark' && !getMountValue(mountEl, name)) {
        return;
      }
      const marker = getMountValue(mountEl, name);
      const el = new Component({
        target: mountEl,
        props: {
          ...(props || {}),
          marker,
        },
      })
    }
  );

Promise.all([
  whenOdysseyLoaded,
  proxy('scaler'),
]).then(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('Falling back to non-scrollyteller version for reduced motion.');

    return;
  }

  try {
    const scrollyData = loadScaler('main', 'u-full', 'mark');
    const appMountEl = scrollyData.mountNode;

    if (appMountEl) {
      new ScrollyWrapper({
        target: appMountEl,
        props: { scrollyData, }
      });
    }
  } catch (e) {
    console.log(e);
  }

});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive] public path: ${__webpack_public_path__}`);
}
