import actions from './DeliveryStream.Actions';
import axios from 'axios';
import v1sdk from 'v1sdk';
import util form 'util';
import  chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const should = chai.should();
chai.use(chaiAsPromised);

const dc = actions.DevOpsCenter;
const eh = actions.errorHandler;

let name;
let assetType;
let endpointUrl;
let label;
let description;
let externalOid = 0;


