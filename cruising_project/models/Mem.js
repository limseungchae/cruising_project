const oracledb = require('../models/Oracle');
const Hash = require("./Hash");

let memsql = {
    insertsql : 'insert into mem(meno, email, passwd, name, phone, nick, bth)values (meno.nextval, :1,:2,:3,:4,:5,:6)',
    loginsql : 'SELECT passwd FROM mem WHERE email = :1',
    selectsql : 'select * from mem where email = :1',
    checkEmail : 'SELECT email FROM mem WHERE email= :1',
    detailsql : ` select email, nick from mem where email = :1 `
}

class Mem {

    constructor(email, passwd, name, phone, nick, bth) {
        this.email = email;
        this.passwd = passwd;
        this.name = name;
        this.phone = phone;
        this.nick = nick;
        this.bth = bth;

    }


    async insert() {
        let conn = null;
        let params = [this.email, this.passwd, this.name, this.phone, this.nick, this.bth];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(memsql.insertsql, params);
            await conn.commit();
            if (result.rowsAffected > 0) console.log('회원정보 저장 성공!');
        } catch (ex) {
            console.log(ex);
        } finally {
            await oracledb.closeConn(conn);
        }
    }

    async login(email, passwd) {
        let conn;
        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(
                memsql.loginsql,
                [email]
            );
            let hashpwd = result.rows[0][0];
            let isLogin = await Hash.comparePasswd(passwd, hashpwd);
            return isLogin ? 1 : 0;
        } catch (err) {
            console.error(err);
        } finally {
            if (conn) {
                await conn.close();
            }
        }
    }



    //////////////////
    async selectOne(email) {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [email];
        let members = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(
                memsql.selectsql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while((row = await rs.getRow())) {
                let m = new Mem(row.EMAIL,
                    '', row.NAME, row.PHONE, row.NICK, row.BTH);
                members.push(m);
            }

        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }

        return members;
    }

    static async isEmailExist(email) {  //이메일 중복체크
        const conn = await oracledb.makeConn();
        try {
            const result = await conn.execute(memsql.checkEmail, [email]);
            if (result.rows.length > 0) {
                const [row] = result.rows;
                const [email] = row;
                return new Mem(email);
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await conn.close();
        }
    }

    async detailOne(email) {
        let conn = null;
        let params = [email];
        let members = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(
                memsql.detailsql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while ((row = await rs.getRow())) {
                let m = {'email': row.EMAIL, 'nick': row.NICK};
                members.push(m);
            }

        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }

        return members;
    }
}

module.exports = Mem;