using {Bouldering} from '../db/schema';

service BoulderingService @(
    path    : '/bouldering',
    requires: 'authenticated-user'
) {
    entity Routes as projection on Bouldering.Route;

    entity Registrations @(restrict: [{
        grant: [
            'READ',
            'WRITE',
            'UPDATE',
            'DELETE'
        ],
        where: 'user = $user'
    }])           as projection on Bouldering.Register;

    entity Tags   as projection on Bouldering.Tag;
}