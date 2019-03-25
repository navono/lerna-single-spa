import * as singleSpa from 'single-spa';
import '../libs/system';

export function hashPrefix(prefix: string) {
  return function(location: any) {
    const b = location.hash.startsWith(`#${prefix}`);
    return b;
  };
}

export async function loadApp(name: string, hash: string, appURL: string) {
  singleSpa.registerApplication(
    name,
    () => SystemJS.import(appURL),
    (() => true)
  );
}
