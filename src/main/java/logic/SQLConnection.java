package logic;
import java.sql.*;
public class SQLConnection implements DBConnection {
    private String url = "jdbc:mysql://localhost:3306/?serverTimezone=America/Argentina/Buenos_Aires";
    private static SQLConnection yo=null;

    private SQLConnection() {
    }


    public static SQLConnection getInstance() {
        if (yo==null)
            yo=	new SQLConnection();

        return yo;
    }



    /**
     *  OJO CON EL HECHO DE CHEQUEAR QUE EL URL == null capaz que debe ser con ""
     *
     * @param user nombre del usuario
     * @param key Password
     * @return objeto Connection
     */

    public Connection adminConnection(String user,String key) throws SQLException{
        Connection toRet;

        toRet = DriverManager.getConnection(url,user,key);

        return toRet;
    }

    /**
     *
     *
     * @param user numero de legajo (UNSIGNED INT)
     * @param password pass user
     * @return Retornara el objeto Connection en caso de un acceso exitoso a la base de datos, en caso de contraseña
     *          o user invalido retorna un objeto NULL
     */

    public Connection employeeConnection(int user,String password) throws SQLException{
        Connection toRet=null;

        Connection toRetAux;

                toRetAux = DriverManager.getConnection(url, "empleado", "empleado");

                Statement st = toRetAux.createStatement();
                st.execute("use vuelos");
                String hashPass = Hash.md5(password);

                ResultSet query = st.executeQuery("SELECT legajo,password FROM empleados WHERE legajo="+user+" AND "+"'"+hashPass+"'");

                int legajo = -1;

                //obtengo el legajo para verificar si el empleado con tal clave existia

                while(query.next())
                    legajo = query.getInt("legajo");

                if(legajo!=-1)
                    toRet=toRetAux;

        return toRet;
    }





    }





