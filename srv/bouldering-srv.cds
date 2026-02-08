using {Bouldering} from '../db/schema';

service BoulderingService @(
    path: '/bouldering',
    requires: 'authenticated-user'
) {
    entity RouteSet    as projection on Bouldering.Route;
    entity RegisterSet as projection on Bouldering.Register;
    entity TagSet      as projection on Bouldering.Tag;

}