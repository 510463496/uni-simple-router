import {RoutesRule, Router, routesMapRule} from '../options/base';
import {H5Config} from '../options/config';
import {warn} from '../helpers/warn'
import {getRoutePath} from '../helpers/utils'

export function buildVueRoutes(router: Router, vueRouteMap:RoutesRule):RoutesRule {
    const {pathMap, finallyPathList} = (router.routesMap as routesMapRule);
    const vueRoutePathList:Array<string> = Object.keys(vueRouteMap);
    const h5Options = (router.options.h5 as H5Config);
    for (let i = 0; i < vueRoutePathList.length; i++) {
        const path = vueRoutePathList[i];
        const myRoute:RoutesRule = pathMap[path];
        const vueRoute:RoutesRule = vueRouteMap[path];
        if (!myRoute) {
            warn(`${path} 路由地址在路由表中未找到，确定是否传递漏啦`, router, true);
        } else {
            const {finallyPath, alias} = getRoutePath(myRoute);
            if (finallyPath instanceof Array) {
                throw new Error(`非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ ${JSON.stringify(myRoute)}`);
            }
            if (myRoute.name != null) {
                vueRoute.name = myRoute.name;
            }
            if (h5Options.aliasCoverPath) {
                vueRoute['path'] = (finallyPath as string);
            } else {
                if (alias != null) {
                    vueRoute['alias'] = alias;
                }
            }
            const beforeEnter = myRoute.beforeEnter;
            if (beforeEnter) {
                vueRoute['beforeEnter'] = beforeEnter;
            }
        }
    }
    if (finallyPathList.includes('*')) {
        vueRouteMap['*'] = pathMap['*']
    }
    return vueRouteMap
}

export function buildVueRouter(router:Router, vueRouter:any, vueRouteMap:RoutesRule) :void |never {
    const routes:RoutesRule[] = Object.values(vueRouteMap);

    // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
    const newVueRouter:any = new vueRouter.constructor({
        ...router.options.h5,
        routes
    });
    vueRouter.matcher = newVueRouter.matcher;
    console.log('实例化完成')
    // const [mount] = router.mount;
    // if (mount == null) {
    //     throw new Error(`你真的不需要挂载实例吗？要不要试试\r\n\r\n RouterMount(Vim:any, router:Router, el:string | undefined = '#app') :void|never \r\n`);
    // }
    // mount.app.$mount();
}
