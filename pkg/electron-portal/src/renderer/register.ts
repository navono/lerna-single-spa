import * as singleSpa from 'single-spa';
// import '../../libs/system';

export interface Project {
  name: string;
  entryURL: string;
  storeURL: string;
  prefix?: string;
  path?: string;
  base?: boolean;
}

// hash 模式
export function hashPrefix({path, prefix}) {
  return function (location) {
      let isShow = false
      //如果该应用 有多个需要匹配的路劲
      if(Array.isArray(path)){
          path.forEach(path => {
              if(location.hash.startsWith(`#${path}`)){
                  isShow = true
              }
          });
      }
      // 普通情况
      else if(location.hash.startsWith(`#${path || prefix}`)){
          isShow = true
      }
      return isShow;
  }
}

// 普通路径模式
export function pathPrefix({path, prefix}) {
  return function (location: any) {
      let isShow = false
      //如果该应用 有多个需要匹配的路劲
      if(Array.isArray(path)){
          path.forEach(path => {
              if(location.pathname.indexOf(`${path}`) === 0){
                  isShow = true
              }
          });
      }
      // 普通情况
      else if(location.pathname.indexOf(`${path || prefix}`) === 0){
          isShow = true
      }
      return isShow;
  }
}

export async function loadApp({name, prefix, appURL, storeURL, base, path, globalEventDistributor}) {
  let storeModule = {
    storeInstance: {},
  },
    customProps = { globalEventDistributor: globalEventDistributor, store: {} };

  // try to import the store module
  try {
    storeModule = storeURL
      ? await SystemJS.import(storeURL)
      : { storeInstance: null };
  } catch (e) {
    console.log(`Could not load store of app ${name} from ${storeURL}.`, e);
  }

  console.log('storeModule ', storeModule);
  
  if (storeModule.storeInstance && globalEventDistributor) {
    // add a reference of the store to the customProps
    customProps.store = storeModule.storeInstance;

    // register the store with the globalEventDistributor
    globalEventDistributor.registerStore(storeModule.storeInstance);
  }

  
    //准备自定义的 props,传入每一个单独工程项目
    customProps = { store: storeModule, globalEventDistributor: globalEventDistributor };
    singleSpa.registerApplication(
      name,
      () => SystemJS.import(appURL),
      base ? (() => true) : pathPrefix({path, prefix}),
      customProps
    );
}
