const oracledb = require(`../models/Oracle`);

let eatsql = {
    showsql : ` select eno,title,grade,sig,tel,addr,time,menu from eats where eno = :1 `,
    tagsql1 : ` select eno,title,grade,sig,text from eats order by title `,
    putadsql : ` insert into eats(eno, title, sig, tel, addr, time, menu) values (eno.nextval,:1,:2,:3,:4,:5,:6) `,
    selectCount : ` select count(eno) cnt from eats `
}

class Eats {

    constructor(title, grade, sig, tel, addr, time, menu,text) {
        this.text = text;
        this.title = title;
        this.grade = grade;
        this.sig = sig;
        this.tel = tel;
        this.addr = addr;
        this.time = time;
        this.menu = menu;
    }

    async show(eno) {
        let conn = null;
        let params = [eno];
        let info = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(eatsql.showsql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while((row = await rs.getRow())) {
                let m = {'eno':row.ENO, 'title': row.TITLE, 'grade': Math.round(row.GRADE*100)/100, 'sig': row.SIG, 'tel': row.TEL, 'addr': row.ADDR, 'time': row.TIME, 'menu': row.MENU};
                info.push(m);
            }

        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }

        return info;
    }


    async tag1() {
        let conn = null;
        let params = [];
        let info = [];
        let cnt = -1;

        try {
            conn = await oracledb.makeConn();
            cnt = await this.selectCount(conn);
            let count = cnt;

            let result = await conn.execute(eatsql.tagsql1, params, oracledb.options);
            let rs = result.resultSet;
            //console.log('rs1',rs)
            let row = null;
            while((row = await rs.getRow())) {
                let m = {'eno':row.ENO, 'title': row.TITLE, 'grade': Math.round(row.GRADE*100)/100, 'sig': row.SIG,'text':row.TEXT};;
                m.cnt = (count+1)-(cnt--);
                info.push(m);
            }
            //console.log('-1//////////-',info)
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }

        return info;
    }


    async selectCount(conn) {
        let result = null;
        let params = [];
        let idx = -1
        try {
            result = await conn.execute(eatsql.selectCount, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            if ((row = await rs.getRow())) idx = row.CNT;

        } catch (e) {
            console.log(e)
        }
        return idx;
    }


    async putin() {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [this.title, this.sig, this.tel, this.addr, this.menu];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(eatsql.putadsql, params);
            await conn.commit();
            if (result.rowsAffected > 0) console.log('회원정보 저장 성공!');
        } catch (ex) {
            console.log(ex);
        } finally {
            await oracledb.closeConn(conn);
        }
    }
}


module.exports = Eats;

