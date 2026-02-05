using {Bouldering} from '../db/schema';

service BoulderingService @(path: '/bouldering') {

    entity RouteSet    as projection on Bouldering.Route;
    entity RegisterSet as projection on Bouldering.Register;
    entity TagSet      as projection on Bouldering.Tag;

}