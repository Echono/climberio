using { cuid } from '@sap/cds/common';

context Interfaces {
    
    entity Excersise : cuid {
        name : String;
        description : String;
    }

}

context Excersises {

    entity Bouldering : Interfaces.Excersise {
        route: String;
        tags : Association to many ValueHelp.BoulderingTags;
        grade : Association to one ValueHelp.Grade;
        location: String;
    }

}

context ValueHelp {

    entity BoulderingTags {
        tagName : String;
        description : String;
    }

    entity Grade {
        color: String;
        vEquivalent: String;
    }

}