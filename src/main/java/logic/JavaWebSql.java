package logic;
import org.json.simple.*;
import java.sql.*;

public class JavaWebSql {
    private Connection cn;
    private String userConnected;


    /**
     * El constructor ya inicializa la variable DBConnection (la cual es un singleton) que nos permitira conectarnos
     * a la base de datos
     */
    public JavaWebSql() {
        cn = null;
        userConnected = "";
    }

    /**
     * @param pass Admin password
     * @return un Objeto Json con [code,Msg de error,Data[]]
     */
    public String connectToAdmin(String pass) {
        DBConnection cnAux = SQLConnection.getInstance();
        JSONObject toRet = new JSONObject();

        try {
            cn = cnAux.adminConnection("admin", pass);
            toRet.put("code", 1);
            toRet.put("msg", "Usuario 'admin' se logueo exitosamente");
            toRet.put("data",null);
            userConnected = "admin";
        } catch (SQLException e) {
            toRet.put("code", 3);
            String err = e.getMessage();
            toRet.put("msg", err);
            toRet.put("data",null);

        }
        return toRet.toJSONString();
    }

    /**
     *
     * @return un Objeto Json con [code,Msg de error,Data[]]
     */
    public String showTables() {
        JSONObject toRet1 = new JSONObject();
        JSONArray data = new JSONArray();

        if (!userConnected.equals("admin")) {
            toRet1.put("code",3);
            toRet1.put("err","La consulta a fallado por que el usuario conectado no es Admin");
            toRet1.put("data",null);

            return toRet1.toJSONString();
        }
        try {
            Statement st = cn.createStatement();
            st.execute("use vuelos");
            ResultSet query = st.executeQuery("show tables");
            toRet1.put("code",1);
            toRet1.put("err",null);

            String nombre;

            while (query.next()) {
                nombre = query.getString("Tables_in_vuelos");
                data.add(nombre);
            }
            toRet1.put("data",data);
            st.close();
        }

        catch (SQLException e){
            toRet1.put("code",3);
            toRet1.put("err",e.getMessage());
            toRet1.put("data",null);
        }

        return toRet1.toJSONString();
    }

    /**
     *
     * @param name nombre de la tabla
     * @return un Objeto Json con [code,Msg de error,Data[]]
     */
    public String describeTable(String name){
        JSONObject toRet = new JSONObject();
        JSONArray data = new JSONArray();

        if (!userConnected.equals("admin")) {
            toRet.put("code",3);
            toRet.put("err","La consulta a fallado por que el usuario conectado no es Admin");
            toRet.put("data",null);

            return toRet.toJSONString();
        }

        try {
            Statement st = cn.createStatement();
            st.execute("use vuelos");
            ResultSet query = st.executeQuery("describe "+name);
            toRet.put("code",1);
            toRet.put("err",null);

            String atributo;

            while (query.next()) {
                atributo = query.getString("Field");
                data.add(atributo);
            }
            toRet.put("data",data);
            st.close();
            }

        catch (SQLException e){
            toRet.put("code",3);
            toRet.put("err",e.getMessage());
            toRet.put("data",null);
        }

        return toRet.toJSONString();

    }

    /**
     *
     * @param query recibo la query cargada por consola del usuario admin
     * @return Un objeto Json : (cod,err,data:[(),(),...,()]) donde cada
     *         () corresponde con un nuevo Objeto Json con --> :[(nomCol1,dato1),...,(nomColN,datoN)]
     *  --- VERIFICAR EL IF - ELSE  ---- ver si usar o no el cn.isValid(0)
     *  Asumo como CODIGO DE ERROR (de Conneccion perdida) : 4
     */
    public String adminQuery(String query){
        JSONObject toRet = new JSONObject();
        JSONArray data = new JSONArray();
        try {
            // Verifico si la coneccion continua activa (CHEQUEAR SI FUNCIONA)
            if (cn.isValid(0) && userConnected.equals("admin")) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                ResultSet rs = st.executeQuery(query);

                ResultSetMetaData colData = rs.getMetaData();
                int columnas = colData.getColumnCount();

                //Comienzo a cargar el objeto Json el cual tiene codigo error OK
                toRet.put("code",1);
                toRet.put("err",null);

                JSONObject aux;

                while(rs.next()){
                    aux= new JSONObject();
                    int i;
                    for(i=1; i<=columnas ;i++){
                        aux.put(colData.getColumnName(i),rs.getString(i));
                    }
                    data.add(aux);
                }

                toRet.put("data",data);
                rs.close();
                st.close();
            }

            // Hay un error en la coneccion ver si funciona bien el isValid()
            else {
                toRet.put("code",4);
                toRet.put("err","La coneccion con la base de datos se a perdido, por favor conectarse nuevamente");
                toRet.put("data",null);
                return toRet.toJSONString();
            }
        }
        catch (SQLException e){
                //aqui considerariamos el error de sintaxis en la sentencia sql
                toRet.put("cod",3);
                toRet.put("err",e.getMessage());
                toRet.put("data",null);
        }

        return toRet.toJSONString();
    }

    /**
     * La idea seria muy similar a excecuteQuery con la salvedad que no retornaremos datos en el Json, solamente
     * codigo de error y msg correspondiente.
     * Recordar que uso isValid(0) para verificar si la coneccion sigue activa y le asocio el codigo de error 4
     *
     * @param sentence sentenciaSQL
     * @return Respuesta a la sentencia SQL ejecutada
     */
    public String executeBasicSentence(String sentence){
        JSONObject toRet = new JSONObject();

        try{
            if(cn.isValid(0) && userConnected.equals("admin")){
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                st.execute(sentence);

                toRet.put("code",1);
                toRet.put("msg","La sentencia sql se realizo correctamente");
                toRet.put("data",null);
                st.close();
            }
            else{
                toRet.put("code",4);
                toRet.put("msg","Hubo un problema con la coneccion, recomendamos salir y loguearse nuevamente");
                toRet.put("data",null);
                return  toRet.toJSONString();
            }

        }

        catch (SQLException e){
            toRet.put("code",3);
            toRet.put("msg",e.getMessage());
            toRet.put("data",null);
        }

        return  toRet.toJSONString();
    }

    public String executeUpdate(String sentence){
        JSONObject toRet = new JSONObject();
        try {
            if (cn.isValid(0) && userConnected.equals("admin")) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                st.executeUpdate(sentence);

                toRet.put("code", 1);
                toRet.put("msg", "La sentencia sql se realizo correctamente");
                toRet.put("data", null);
                st.close();
            }
            else{
                toRet.put("code",4);
                toRet.put("msg","Hubo un problema con la coneccion, recomendamos salir y loguearse nuevamente");
                toRet.put("data",null);
                return  toRet.toJSONString();
            }
        }

        catch (SQLException e){
            toRet.put("code",3);
            toRet.put("msg",e.getMessage());
            toRet.put("data",null);
        }

        return  toRet.toJSONString();
    }


    /**
     *
     * @param leg unsigned int correspondiente al numero de legajo del empelado
     * @param pass  contraseña del usuario la cual debe coincidir con la contraseña en la tabla empleados
     * @return Objeto Json :([cod,],[err,],[data,NULL]), donde cod--> 2 (es legajo/contraseña invalida)
     */

    public String connectToEmploy(int leg,String pass){
        DBConnection cnAux = SQLConnection.getInstance();
        JSONObject toRet = new JSONObject();
        Connection validConn;
        try{
            validConn = cnAux.employeeConnection(leg,pass);
            //si hubo error en el leg o pass
            if (validConn==null){
                toRet.put("code",2);
                toRet.put("err","Hay un error en el legajo/password Ingresados");
                toRet.put("data",null);
                return toRet.toJSONString();
            }

            cn=validConn;
            userConnected = "empleado";
            toRet.put("code",1);
            toRet.put("err","El usuario se a logueado Correctamente");
            toRet.put("data",null);

        }

        catch(SQLException e){
            toRet.put("code",3);
            toRet.put("err",e.getMessage());
            toRet.put("data",null);
        }

        return toRet.toJSONString();
    }

    public String ubicaciones() {
        JSONObject toRet = new JSONObject();
        JSONArray data = new JSONArray();
        try {
            if (cn.isValid(0)) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                ResultSet rs = st.executeQuery("select * from ubicaciones");
                toRet.put("code",1);
                toRet.put("msg","");

                String pais;
                String estado;
                String ciudad;
                JSONObject aux;
                while (rs.next()) {
                    pais = rs.getString("pais");
                    estado = rs.getString("estado");
                    ciudad = rs.getString("ciudad");
                    aux = new JSONObject();
                    aux.put("pais",pais);
                    aux.put("estado",estado);
                    aux.put("ciudad",ciudad);

                    data.add(aux);
                }
                toRet.put("data",data);
                st.close();
                rs.close();
            }
            else{
                toRet.put("code",4);
                toRet.put("msg","Hubo un problema con la coneccion, recomendamos salir y loguearse nuevamente");
                toRet.put("data",null);
                return  toRet.toJSONString();
            }
        }
        catch (SQLException e){
            toRet.put("code",3);
            toRet.put("msg",e.getMessage());
            toRet.put("data",null);
        }

        return toRet.toJSONString();
    }

    public String getAvalaibleFlyes(String fecha,String ciudad){
        JSONObject toRet = new JSONObject();
        JSONArray data = new JSONArray();
        try{
            if (cn.isValid(0)) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                ResultSet rs = st.executeQuery(" select distinct vuelo as'Numero de vuelo',a1_codigo, a1_nombre,hora_sale," +
                        "a2_nombre,a2_codigo,hora_llega,modelo_avion,tiempo_estimado " +
                        "from vuelos_disponibles where "+
                        "fecha='"+fecha+"' AND a1_ciudad='"+ciudad+"';");
                toRet.put("code",1);
                toRet.put("msg","");
                JSONObject aux;
                while(rs.next()){
                    aux= new JSONObject();
                    aux.put("Numero de vuelo",rs.getString("Numero de vuelo"));
                    aux.put("a1_codigo",rs.getString("a1_codigo"));
                    aux.put("a1_nombre",rs.getString("a1_nombre"));
                    aux.put("hora_sale",rs.getString("hora_sale"));
                    aux.put("a2_codigo",rs.getString("a2_codigo"));
                    aux.put("a2_nombre",rs.getString("a2_nombre"));
                    aux.put("hora_llega",rs.getString("hora_llega"));
                    aux.put("model_avion",rs.getString("modelo_avion"));
                    aux.put("tiempo_estimado",rs.getString("tiempo_estimado"));

                    data.add(aux);

                }

                toRet.put("data",data);
                st.close();
                rs.close();

            }
            else{
                toRet.put("code",4);
                toRet.put("msg","Hubo un problema con la coneccion, recomendamos salir y loguearse nuevamente");
                toRet.put("data",null);
                return  toRet.toJSONString();
            }
        }

        catch (SQLException e){
            toRet.put("code",3);
            toRet.put("msg",e.getMessage());
            toRet.put("data",null);
        }
        return toRet.toJSONString();
    }

    public String getClassesForFlight(String vuelo,String fecha,String ciudad){
        JSONObject toRet = new JSONObject();
        JSONArray data = new JSONArray();
        try{
            if (cn.isValid(0)) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                ResultSet rs = st.executeQuery("select clase,asientos_disponibles,precio from vuelos_disponibles " +
                        "where fecha='"+fecha+"' AND a1_ciudad='"+ciudad+"' and vuelo='"+vuelo+"';");
                toRet.put("code",1);
                toRet.put("msg","");
                JSONObject aux;
                while(rs.next()) {
                    aux=new JSONObject();
                    aux.put("clase",rs.getString("clase"));
                    aux.put("asientos_disponibles",rs.getString("asientos_disponibles"));
                    aux.put("precio",rs.getString("precio"));
                    data.add(aux);
                }
                toRet.put("data",data);
                st.close();
                rs.close();
                }
            else{
                toRet.put("code",4);
                toRet.put("msg","Hubo un problema con la coneccion, recomendamos salir y loguearse nuevamente");
                toRet.put("data",null);
                return  toRet.toJSONString();
            }

            }
        catch (SQLException e){
            toRet.put("code",3);
            toRet.put("msg",e.getMessage());
            toRet.put("data",null);
        }
        return toRet.toJSONString();
    }
}
