package logic;
import java.sql.*;

public interface DBConnection {


        public Connection employeeConnection(int user,String password) throws SQLException;

        public Connection adminConnection(String user,String key) throws SQLException;

    }




