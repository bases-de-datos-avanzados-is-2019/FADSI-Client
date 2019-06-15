export interface OrderInterface {
  idCliente?: string;
  idSitios?: any[];
  items?: [object];
  date?: string,
  status?: string;
  extraDetail?: string;
  totalSum?: number;
}
