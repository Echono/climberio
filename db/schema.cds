using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

context Bouldering {

    entity Route : cuid, managed {
        name          : String;
        officialGrade : Grade;
        amountOfHolds : Integer;
        wallType      : Wall;
        active        : Boolean;
        removedAt     : Timestamp;
        registrations : Composition of many Register
                            on registrations.route = $self;
        tags          : Composition of many {
                            key tag : Association to Tag
                        };
    }

    entity Register {
        key user                  : User       @cds.on.insert: $user;
        key route                 : Association to one Route;
            runnerGradeDifficulty : Difficulty;
            attempts              : Integer;
            status                : RouteStatus;
            createdAt             : Timestamp  @cds.on.insert: $now;
            modifiedAt            : Timestamp  @cds.on.insert: $now  @cds.on.update: $now;
    }

    entity Tag : cuid {
        name    : String;
        tagText : String(10);
        routes  : Composition of many Route.tags
                      on routes.tag = $self;
    }

    type RouteStatus : String enum {
        INPROGRESS = 'In Progress';
        CLOSED = 'Closed';
        ONHOLD = 'On Hold';
    }

    type Wall        : String enum {
        SLAB = 'Slab';
        SLOPE = 'Slope';
        OVERHANG = 'Overhang';
    }

    type Grade       : String enum {
        GREEN = 'Green';
        YELLOW = 'Yellow';
        ORANGE = 'Orange';
        BLUE = 'Blue';
        PURPLE = 'Purple';
        RED = 'Red';
        BLACK = 'Black';
        PINK = 'Pink';
    }

    type Difficulty  : Integer enum {
        VERYEASY = 1;
        EASY = 2;
        MEDIUM = 3;
        HARD = 4;
        VERYHARD = 5;
    }

}

context Authentication {

    entity User : cuid {
        email       : String;
        username    : String;
        roles       : array of String;
        avatar      : String;
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

    type AuthenticationStatus {
        code    : Integer enum {
            SUCCESS = 200;
            UNAUTHORIZED = 401;
        };
        message : String enum {
            SUCCESS = 'Authenticated';
            UNAUTHORIZED = 'Unauthorized';
        };
        user    : Association to one Authentication.User;
    }

}