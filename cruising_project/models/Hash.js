const bcrypt = require("bcrypt");

const Hash = {
// 암호 입력시 해시함수에 의해 해시코드로 변환된 암호 생성
     hashPassword : async (passwd) => {
        let saltRounds = 10;
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(passwd, salt);
            console.log('hashpwd - ', hash, passwd, salt);

            return hash;
        } catch (err) {
            console.log(err);
        }
    },

// 암호 비교 함수 - 암호와 해시화된 암호를 비교
    comparePasswd : async (passwd, hashpwd) => {
        try {
            const result = await bcrypt.compare(passwd, hashpwd);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = Hash;