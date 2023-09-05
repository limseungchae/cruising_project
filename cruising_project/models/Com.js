const oracledb = require('../models/Oracle');

let comsql = {
    upsql:'insert into com(cno, nick, contents,regdate) values (cno.nextval, :1, :2, :3)',
    downsql:'select nick, contents,regdate from com where cno = :1',
    delsql:'delete from com where cno = :1'
}

class Com {

    constructor(cno,nick, contents, regdate) {
        this.cno = cno;
        this.nick = nick;
        this.contents = contents;
        this.regdate = regdate;
    }

    async upload () {
        let conn = null;
        let params = [this.nick, this.contents];
        let uploadcnt = 0;

        try {
            conn = await oracledb.makeConn();  // 연결
            let result = await conn.execute(comsql.upsql, params); // 실행
            await conn.commit();  // 확인
            if (result.rowsAffected > 0) {uploadcnt = result.rowsAffected}
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(); // 종료
        }

        return uploadcnt
    }

    async download(nick) {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [nick];
        let text = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(
                comsql.downsql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while((row = await rs.getRow())) {
                let m = new Com(row.NICK, row.CONTENTS);
                m.regdate = row.REGDATE;
                text.push(m);
            }

        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }

        return text;
    }

    async delete(cno) {
        let conn = null;
        let params = [cno];
        let deletecnt = 0;

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(comsql.delsql, params);
            await conn.commit();
            if (result.rowsAffected > 0) deletecnt = result.rowsAffected;
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }

        return deletecnt;
    }
}

module.exports = Com;