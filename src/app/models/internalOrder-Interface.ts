import {ProductInterface} from '../models/product-interface';

export interface internalOrderInterface {
    total? : number;
    products? : [Object];
}