import * as singleSpa from 'single-spa';
import '../../libs/system';
import { GlobalEventDistributor } from './globalEventDistributor';

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

interface Param {
  name: string;
  prefix: string;
  appURL: string;
  storeURL: string,
  base: boolean;
  path: string;
  globalEventDistributor: GlobalEventDistributor ;
}

export async function loadApp(param: Param) {
  let storeModule = {
    storeInstance: {},
  },
    customProps = { globalEventDistributor: param.globalEventDistributor };

  // try to import the store module
  try {
    storeModule = param.storeURL
      ? await SystemJS.import(param.storeURL)
      : { storeInstance: null };
  } catch (e) {
    console.log(`Could not load store of app ${name} from ${param.storeURL}.`, e);
  }

  if (storeModule.storeInstance && param.globalEventDistributor) {
    // register the store with the globalEventDistributor
    param.globalEventDistributor.registerStore(param.name, storeModule.storeInstance);
  }
  
    // 准备自定义的 props,传入每一个单独工程项目。
    // 因为 React-Redux v6+ 后，不支持从外界传入 Store 进行构造，因此不再单独传入 store，
    // 可通过 globalEventDistributor 获取
    customProps = { globalEventDistributor: param.globalEventDistributor };
    singleSpa.registerApplication(
      param.name,
      () => SystemJS.import(param.appURL),
      param.base ? (() => true) : pathPrefix({path: param.path, prefix: param.prefix}),
      customProps
    );
}
