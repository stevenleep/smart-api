import {
  ServiceConstructorOptions,
  DefaultServicesConfigMaps,
  ReturnTypes,
  AnyRequestFunction,
} from "./interface";
import {
  getRequestInstance,
  createRequestFunction,
  safeServiceConfig,
  getRequestPath,
} from "./helper";

export function createProxy<
  UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps,
  Options extends ServiceConstructorOptions = ServiceConstructorOptions
>(
  servicesConfigMaps: UserServicesConfigMaps,
  rootInstance: any,
  options: Options = {} as Options
): ReturnTypes<UserServicesConfigMaps> {
  return new Proxy(servicesConfigMaps, {
    get(target, prop) {
      if (prop in target) {
        const serviceConfig = safeServiceConfig(
          target,
          prop as string,
          options
        );

        const requestInstance = getRequestInstance(rootInstance, serviceConfig);
        return createRequestFunction(requestInstance, {
          ...serviceConfig,
          path: getRequestPath(options, serviceConfig),
          method: serviceConfig.method || options.defaultMethod || "get",
        }) as AnyRequestFunction;
      }
      throw new Error(`Service ${String(prop)} not found`);
    },
    set(target, prop, value, receiver) {
      throw new Error(`Service ${String(prop)} cannot be set`);
    },
    deleteProperty(target, prop) {
      throw new Error(`Service ${String(prop)} cannot be deleted`);
    },
  }) as unknown as ReturnTypes<UserServicesConfigMaps>;
}

export class ProxyService {
  constructor(
    private readonly rootInstance: any,
    private readonly options: ServiceConstructorOptions = {}
  ) {
    if (!rootInstance) {
      throw new Error("Root Instance not found");
    }
    this.createServices = this.createServices.bind(this);
  }

  public createServices<
    UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps
  >(serviceConfigs: UserServicesConfigMaps = {} as UserServicesConfigMaps) {
    return createProxy(serviceConfigs, this.rootInstance, this.options);
  }
}
