const oracledb = require('oracledb');
const dbconfig = require('../dbconfig');

const Oracle = {
    options : {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    },

    initConn: () => {
        oracledb.initOracleClient(
            {libDir: '/usr/lib/oracle/11.2/client64/lib'});
    },

    makeConn: async () => {
        try {
            return await oracledb.getConnection(dbconfig.db);
        } catch (e) { console.log(e); }
    },

    closeConn: async (conn) => {
        if (conn) {
            try { await conn.close(); }
            catch (e) { console.log(e); }
        }
    }
}

module.exports = Oracle;
