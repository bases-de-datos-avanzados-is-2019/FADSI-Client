import {ProductInterface} from '../models/product-interface';

export interface internalOrderInterface {
    total? : number;
    products? : [Object];
    clientID? : string;
    stores? : any[];
    specifics? : string;

}
