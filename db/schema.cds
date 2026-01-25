using {cuid} from '@sap/cds/common';

context Interfaces {

    entity Excersise : cuid {
        name        : String;
        description : String;
    }

}

context Excersises {

    entity Bouldering : Interfaces.Excersise {
        route    : String;
        location : String;
        Tags     : Association to many ValueHelp.BoulderingTags
                       on $self.ID = Tags.ID;
        Grade    : Association to one ValueHelp.Grade;
    }

}

context ValueHelp {

    entity BoulderingTags : cuid {
        tagName     : String;
        description : String;
        Routes      : Association to many Excersises.Bouldering
                          on $self.ID = Routes.ID;
    }

    entity Grade {
        color       : String;
        vEquivalent : String;
    }

}

context Authentication {

    entity User : cuid {
        key email       : String;
            roles       : array of String;
            Credentials : Composition of many Authentication.FederatedCredentials
                              on Credentials.subject = $self.email;
    }

    entity FederatedCredentials {
        key provider : String;
        key subject  : String;
            user     : Association to one Authentication.User
                          on user.email = $self.subject;
    }

}

context Status {

    type Authentication {
        code    : Integer enum {
            SUCCESS = 200;
            UNAUTHORIZED = 401;
        };
        message : String enum {
            SUCCESS = 'Authenticated';
            UNAUTHORIZED = 'Unauthorized';
        }
    }

}