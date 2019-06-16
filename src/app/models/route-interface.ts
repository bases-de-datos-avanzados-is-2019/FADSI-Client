import {RouteSite} from './route-site-interface';

export interface RouteInterface {
  idCliente?: string;
  idMainSite?: string;
  possibleSites?: RouteSite[];
}
