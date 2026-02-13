using {Bouldering} from '../db/schema';

service BoulderingService @(
    path: '/bouldering',
    requires: 'authenticated-user'
) {
    entity RouteSet    as projection on Bouldering.Route;
    
    entity RegisterSet @(restrict: [ { grant: ['READ', 'WRITE', 'UPDATE', 'DELETE'], where: 'user = $user' } ]) as projection on Bouldering.Register;
    
    entity TagSet      as projection on Bouldering.Tag;
}