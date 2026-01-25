using { Authentication, Status } from '../../db/schema';

service AuthenticationService @(path: '/authentication') {

    entity FederatedCredentialsSet as projection on Authentication.FederatedCredentials;

    entity UserSet as projection on Authentication.User;

    function isAuthenticated() returns Status.Authentication;

}