import logic.Hash;
import logic.JavaWebSql;
import org.json.simple.JSONObject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.*;

public class Main {

    public static void main(String[] args){

        HelloFX.main(args);
       /**
        JavaWebSql base = new JavaWebSql();
        JSONObject ret = base.connectToAdmin("admin");
        JSONObject ret2= base.showTables();
        System.out.println(ret2.toString());
        JSONObject ret3 = base.describeTable("aeropuertos");
        System.out.println(ret3.toString());
        JSONObject ret4 = base.adminQuery("select * from salidas");
        System.out.println(ret4.toString());
        JSONObject ret5 = base.ubicaciones();
        System.out.println(ret5.toString());
        System.out.println(Hash.md5("pepe"));
**/

    }

}
