package logic;
import java.sql.*;

public interface DBConnection {

        /**
         * Realiza la conexion con la base de datos
         * @param url
         * @return objeto de tipo Connection
         */

        //public Connection establecerConexion(String url);

        public Connection employeeConnection(int user,String password) throws SQLException;

        public Connection adminConnection(String user,String key) throws SQLException;

    }




