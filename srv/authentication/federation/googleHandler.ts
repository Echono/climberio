import { User } from '#cds-models/Authentication';
import AuthenticationService, { FederatedCredentialsSet, UserSet } from '#cds-models/AuthenticationService';
import cds, { connect } from '@sap/cds';
import { Application } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

export function googleSetStrategy(app: Application) {
    // Set Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    async function(accessToken, refreshToken, profile, done) {

        // Find current user in DB
        const provider = 'google';
        const service = await connect.to(AuthenticationService);
        const selectQuery = SELECT.one.from(UserSet, user => {
            user.email,
            user.roles,
            user.Credentials(cred => {
                cred.provider,
                cred.subject
            })
        }).where({email: profile.email});
        let user = await service.run(selectQuery) as User;
        
        const federatedPayload = {
            provider: provider,
            subject: profile.id as string 
        };

        // No current user? Create one
        if(!user) {
            const insertUserQuery = INSERT.into(UserSet).entries({
                email: profile.email,
                roles: ['consumer'],
                Credentials: [federatedPayload]
            });
            user = await service.run(insertUserQuery);
        }

        // Another way of logging in then a federation used before? Add new federated credentials
        const registeredFederation = user?.Credentials?.find(cred => cred.provider === provider && cred.subject === profile.email) ? true : false;
        if(!registeredFederation) {
            const insertQuery = INSERT.into(FederatedCredentialsSet).entries({
                ...federatedPayload,
                user: { ID: user.ID, email: user.email }
            });
            await service.run(insertQuery);
        } 

        return done(null, new cds.User({ ...profile, roles: user.roles }));

    }))

    // Google OAuth2 routes
    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/climberioui/index-cdn.html#/dashboard',
        failureRedirect: '/auth/failed'
    }));

    // Serialize and deserialize user (for session support)
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj as Express.User);
    });
}