type RequestMethods = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "trace" | "connect";
type SupportedRequestMethods = RequestMethods | Uppercase<RequestMethods> | Capitalize<RequestMethods> | Uncapitalize<RequestMethods>;
type ServiceConstructorOptions<Namespaces extends Object = Record<string, string>> = {
    defaultMethod?: SupportedRequestMethods;
    namespaces?: string | (Namespaces & {
        default: string;
    });
};
type ServiceConfig = {
    method?: SupportedRequestMethods;
    path?: string;
    namespace?: string;
    instance?: any;
};
type DefaultServicesConfigMaps = Record<string, ServiceConfig | string>;
type AnyRequestFunction = (...args: any[]) => Promise<any>;
type ReturnTypes<ServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps, Keys extends keyof ServicesConfigMaps = keyof ServicesConfigMaps> = {
    [key in Keys]: AnyRequestFunction;
};

declare function createProxy<UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps, Options extends ServiceConstructorOptions = ServiceConstructorOptions>(servicesConfigMaps: UserServicesConfigMaps, rootInstance: any, options?: Options): ReturnTypes<UserServicesConfigMaps>;
declare class ProxyService {
    private readonly rootInstance;
    private readonly options;
    constructor(rootInstance: any, options?: ServiceConstructorOptions);
    createServices<UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps>(serviceConfigs?: UserServicesConfigMaps): ReturnTypes<UserServicesConfigMaps, keyof UserServicesConfigMaps>;
}

declare function createLooseProxy<UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps, Options extends ServiceConstructorOptions = ServiceConstructorOptions>(servicesConfigMaps: UserServicesConfigMaps, rootInstance: any, options?: Options): ReturnTypes<UserServicesConfigMaps>;
declare class LooseService {
    private readonly rootInstance;
    private readonly options;
    constructor(rootInstance: any, options?: ServiceConstructorOptions);
    createServices<UserServiceConfigs extends DefaultServicesConfigMaps = DefaultServicesConfigMaps>(serviceConfigs?: UserServiceConfigs): ReturnTypes<UserServiceConfigs, keyof UserServiceConfigs>;
}

declare function getRequestInstance(rootInstance: any, options: ServiceConfig): any;
declare function getNamespacePath(namespaces: string | Record<string, string>, namespaceName: string): string;
declare function createRequestFunction(requestInstance: any, serviceConfig: Omit<ServiceConfig, "method"> & {
    method: SupportedRequestMethods;
}): <Params extends any[] = any[], ResultType = any>(...args: Params) => Promise<ResultType>;
declare function getRequestPath(options: ServiceConstructorOptions, serviceConfig: ServiceConfig): string;
declare function createDefaultServiceConfig(serviceConfig: ServiceConfig | string, options: ServiceConstructorOptions): ServiceConfig;
declare function safeServiceConfig(serviceConfigMaps: DefaultServicesConfigMaps, key: string, options: ServiceConstructorOptions): ServiceConfig;

export { AnyRequestFunction, DefaultServicesConfigMaps, LooseService, ProxyService, RequestMethods, ReturnTypes, ServiceConfig, ServiceConstructorOptions, SupportedRequestMethods, createDefaultServiceConfig, createLooseProxy, createProxy, createRequestFunction, getNamespacePath, getRequestInstance, getRequestPath, safeServiceConfig };
