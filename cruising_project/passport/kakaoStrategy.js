// const dbconfig  = require('../dbconfig')
//
// export const startKakaoLogin = (req, res) => {
//     const baseUrl = "https://kauth.kakao.com/oauth/authorize";
//     const config = {
//         client_id: dbconfig.kakao.clientID,
//         redirect_uri: dbconfig.kakao.callbackURL,
//         response_type: "code",
//     };
//     const params = new URLSearchParams(config).toString();
//
//     const finalUrl = `${baseUrl}?${params}`;
//     console.log(finalUrl);
//     return res.redirect(finalUrl);
// };
//////////////////////////////////


const passport = require("passport");
//const KakaoStrategy = require("passport-kakao").Strategy;
const { Strategy : KakaoStrategy } = require("passport-kakao");
const dbconfig = require("../dbconfig");
const Mem = require("../models/Mem");
module.exports = () => {
    passport.use(new KakaoStrategy({
            clientID: dbconfig.kakao.clientID,
            callbackURL: dbconfig.kakao.callbackURL
        },
        async (accessToken, refreshToken, profile, done) => {
            // Retrieve the user's email from the Kakao profile
            const email = profile._json && profile._json.kakao_account.email;
            console.log('email---',email)
            console.log('profile---',profile)

            // const isLogin = await Mem.isEmailExist(email);

            // Handle the user login logic as you normally would
            // ...
            try {
                const exUser = await Mem.isEmailExist( email );
                console.log('exUser---',exUser)
                console.log('!!exUser---',!!exUser)

                if (!!exUser) {
                    done(null, exUser);
                } else {
                    // await new Mem(email, '', '', '', nick, '').insert();
                    const newUser = await new Mem(email, '', '', '', '', '').insert({
                        email: profile._json && profile._json.kakao_account_email,
                        //nick: profile.displayName,
                    });
                    console.log('newUser---',newUser)
                    done(null, newUser);
                    console.log('newUser-2--',newUser)
                }
            } catch (error) {
                console.error(error);
                done(error);
            }


            //////////////
        }
    ));
}
