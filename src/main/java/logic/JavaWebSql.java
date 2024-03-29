package logic;
import com.mysql.cj.xdevapi.JsonArray;
import org.json.simple.*;
import java.sql.*;

/**
 * La clase JavaWebSql es la que se encarga de mantener la comunicacion entre Java y Sql y a su vez se encarga de comunicar
 * Java y JavaScript. Esta clase sirve como servidor, y le brinda una interfaz a la web para que realize los pedidos que quiera,
 * y la clase JWS(JavaWebSql) se comunica con la base de datos, y manteniendo un protocolo preestablecido con javaScript (ideado
 * por nosotros) retorna un String (Que a su vez tiene la estructura de un Json el cual es facil de trabajar desde JavaScript)
 * el tiene:
 * - una clave : "code" (codigo de error) tal que :: si code=1 (OK) , code=2 error en los parametros , code=3 error sql
 *              code=4 error en la conexion.
 * - una clave: "msg" :: la cual da informacion de la ejecucion del metodo
 * - una clave: "data" :: el cual es otro ArrayJson con toda la informacion que Java recopilo de la sentencia sobre sql
 *              y que la Web necesita mostrarle al usuario
 */

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
     * @return un String-->Objeto Json con [code,Msg de error,Data[]]
     */
    @SuppressWarnings("unchecked")
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
     * Muestra todas las tablas de la Base de datos vuelos
     * @return un String-->Objeto Json con [code,Msg de error,Data[]]
     */
    @SuppressWarnings("unchecked")
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
     * @return un String -->Objeto Json con [code,Msg de error,Data[]]
     */
    @SuppressWarnings("unchecked")
    public String describeTable(String name){
        JSONArray nom_atributos;
        JSONObject datos_total=null;
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

            ResultSetMetaData colData = query.getMetaData();
            int columnas = colData.getColumnCount();

            nom_atributos = new JSONArray();
            int j;
            for (j=1;j<=columnas;j++)
                nom_atributos.add(colData.getColumnName(j));


            //Comienzo a cargar el objeto Json el cual tiene code OK
            toRet.put("code",1);
            toRet.put("msg","OK");

            JSONObject aux;
            int i;
            while(query.next()){
                aux= new JSONObject();
                for(i=1; i<=columnas ;i++){
                    aux.put(colData.getColumnName(i),query.getString(i));
                }
                data.add(aux);
            }
            datos_total = new JSONObject();
            datos_total.put("colNames",nom_atributos);
            datos_total.put("rows",data);

            toRet.put("data",datos_total);
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
     * @return Un String -->objeto Json : (cod,err,data:[(),(),...,()]) donde cada
     *         () corresponde con un nuevo Objeto Json con --> :[(nomCol1,dato1),...,(nomColN,datoN)]
     *  --- VERIFICAR EL IF - ELSE  ---- ver si usar o no el cn.isValid(0)
     *  Asumo como CODIGO DE ERROR (de Conneccion perdida) : 4
     */
    @SuppressWarnings("unchecked")
    public String executeSelect(String query){
        JSONArray nom_atributos;
        JSONObject datos_total=null;
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

                nom_atributos = new JSONArray();
                int j;
                for (j=1;j<=columnas;j++)
                    nom_atributos.add(colData.getColumnName(j));


                //Comienzo a cargar el objeto Json el cual tiene code OK
                toRet.put("code",1);
                toRet.put("msg","OK");

                JSONObject aux;
                int i;
                while(rs.next()){
                    aux= new JSONObject();
                    for(i=1; i<=columnas ;i++){
                        aux.put(colData.getColumnName(i),rs.getString(i));
                    }
                    data.add(aux);
                }
                datos_total = new JSONObject();
                datos_total.put("colNames",nom_atributos);
                datos_total.put("rows",data);

                toRet.put("data",datos_total);
                rs.close();
                st.close();
            }

            // Hay un error en la coneccion ver si funciona bien el isValid()
            else {
                toRet.put("code",4);
                toRet.put("msg","La coneccion con la base de datos se a perdido, por favor conectarse nuevamente");
                toRet.put("data",null);
                return toRet.toJSONString();
            }
        }
        catch (SQLException e){
                //aqui considerariamos el error de sintaxis en la sentencia sql
                toRet.put("cod",3);
                toRet.put("msg",e.getMessage());
                toRet.put("data",null);
        }

        return toRet.toJSONString();
    }

    /**
     *
     * Realiza la sentencia sql recibida por parametro y corrobora si la sentencia retorna algo y en tal caso
     * analiza el objeto Resultset de la respuesta y lo convierte en Json para retornarlo a la web
     *
     * @param sentence sentenciaSQL
     * @return String --> Json:Respuesta a la sentencia SQL ejecutada
     */
    @SuppressWarnings("unchecked")
    public String execute(String sentence){
        JSONArray nom_atributos;
        JSONObject datos_total=null;
        JSONObject toRet = new JSONObject();
        JSONArray data;
        try{
            if(cn.isValid(0) && userConnected.equals("admin")){
                Statement st = cn.createStatement();
                boolean hasResult=st.execute(sentence);

                if(hasResult){
                    data=new JSONArray();
                    ResultSet rs= st.getResultSet();
                    ResultSetMetaData colData = rs.getMetaData();
                    int columnas = colData.getColumnCount();
                    nom_atributos = new JSONArray();
                    int j;
                    for (j=1;j<=columnas;j++)
                        nom_atributos.add(colData.getColumnName(j));
                    JSONObject aux;
                    int i;
                    while(rs.next()){
                        aux= new JSONObject();

                        for(i=1; i<=columnas ;i++){
                            aux.put(colData.getColumnName(i),rs.getString(i));
                        }
                        data.add(aux);
                    }
                    datos_total = new JSONObject();
                    datos_total.put("colNames",nom_atributos);
                    datos_total.put("rows",data);
                }

                toRet.put("code",1);
                toRet.put("msg","La sentencia sql se realizo correctamente");
                toRet.put("data",datos_total);
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
     * Realiza la sentencia sql que modifica la base de datos de alguna forma y retorna el msj que da sql.
     * @param sentence sentencia sql
     *
     * @return String --> objeto Json
     */
    @SuppressWarnings("unchecked")
    public String executeUpdate(String sentence){
        JSONObject toRet = new JSONObject();
        try {
            if (cn.isValid(0) && userConnected.equals("admin")) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                int i = st.executeUpdate(sentence);

                toRet.put("code", 1);
                toRet.put("msg", "Query OK, "+i+" row affected");
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
     * @return String --> Objeto Json :([cod,],[err,],[data,NULL]), donde cod--> 2 (es legajo/contraseña invalida)
     */
    @SuppressWarnings("unchecked")
    public String connectToEmployee(int leg, String pass){
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

    /**
     *
     * @return String --> Json con todas las ubicaciones disponibles donde hay aeropuerto
     */
    @SuppressWarnings("unchecked")
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

    /**
     *
     * @param fecha fecha del vuelo
     * @param ciudadSalida ciudad desde la que sale el vuelo
     * @param ciudadLlegada ciudad de arrivo
     * @return un String --> Json con todas los vuelos disponibles que cumplan esas condiciones
     */
    @SuppressWarnings("unchecked")
    public String getAvailableFlights(String fecha,String ciudadSalida,String ciudadLlegada){
        JSONObject toRet = new JSONObject();
        JSONArray data = new JSONArray();
        try{
            if (cn.isValid(0)) {
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                ResultSet rs = st.executeQuery(" select distinct vuelo as'Numero de vuelo',a1_codigo, a1_nombre,hora_sale," +
                        "a2_nombre,a2_codigo,hora_llega,modelo_avion,tiempo_estimado " +
                        "from vuelos_disponibles where "+
                        "fecha='"+fecha+"' AND a1_ciudad='"+ciudadSalida+"' AND a2_ciudad='"+ciudadLlegada+"';");
                toRet.put("code",1);
                toRet.put("msg","");
                JSONObject aux;
                while(rs.next()){
                    aux= new JSONObject();
                    aux.put("nro_vuelo",rs.getString("Numero de vuelo"));
                    aux.put("a1_codigo",rs.getString("a1_codigo"));
                    aux.put("a1_nombre",rs.getString("a1_nombre"));
                    aux.put("hora_sale",rs.getString("hora_sale"));
                    aux.put("a2_codigo",rs.getString("a2_codigo"));
                    aux.put("a2_nombre",rs.getString("a2_nombre"));
                    aux.put("hora_llega",rs.getString("hora_llega"));
                    aux.put("modelo_avion",rs.getString("modelo_avion"));
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

    /**
     *
     * @param vuelo numero de vuelo
     * @param fecha fecha de salida
     * @param ciudad ciudad de salida
     * @return un String --> Json con las clases disponibles, cant_asientos y precio del vuelo para cada clase
     */
    @SuppressWarnings("unchecked")
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


    public void disconnect(){
        try {

            if (cn != null)
                cn.close();

        }
        catch (SQLException e){
            System.out.println("ERROR AL DESCONECTARSE"+e.getMessage());
        }
            cn=null;
    }

    @SuppressWarnings("unchecked")
    public String makeOneWayReservation(String num,String date,String clas,
                                            String doc_tip,int doc_num,int legajo) {
        JSONObject toRet = new JSONObject();
        try {
            if (cn.isValid(0)){
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                String callProce = "call make_one_way_reservation('"+num+"','"+clas+"',"+legajo+",'"+doc_tip+"',"+doc_num+",'"
                        +date+"',@result);";
                st.execute(callProce);
                ResultSet result = st.executeQuery("select @result;");
                int reservedState=111;
                while(result.next())
                    reservedState = result.getInt("@result");
                JSONObject state = null;

                if(reservedState==0)
                    toRet.put("code",2);
                else if(reservedState==1) {
                    toRet.put("code", 1);
                    state = new JSONObject();
                    state.put("state",1);
                }
                else if(reservedState==2) {
                    toRet.put("code", 1);
                    state = new JSONObject();
                    state.put("state",2);
                }
                else if(reservedState==3) {
                    toRet.put("code", 1);
                    state = new JSONObject();
                    state.put("state",3);
                }
                toRet.put("Msg",null);
                toRet.put("data",state);


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

    @SuppressWarnings("unchecked")
    public String makeTwoWayReservation(String num,String date,String clas,
                                            String doc_tip,int doc_num,int legajo,
                                                String num_2,String date_2,String clas_2){

        JSONObject toRet = new JSONObject();
        try {
            if (cn.isValid(0)){
                Statement st = cn.createStatement();
                st.execute("use vuelos");
                String callProce = "call make_round_trip_reservation('"+num+"','"+clas+"',"+legajo+",'"+doc_tip+"',"+doc_num+",'"
                        +date+"','"+num_2+"','"+clas_2+"','"+date_2+"',@result);";
                st.execute(callProce);

                ResultSet result = st.executeQuery("select @result;");
                int reservedState=111;
                while(result.next())
                    reservedState = result.getInt("@result");
                JSONObject state = null;

                if(reservedState==0)
                    toRet.put("code",2);
                else if(reservedState==1) {
                    toRet.put("code", 1);
                    state = new JSONObject();
                    state.put("state",1);
                }
                else if(reservedState==2) {
                    toRet.put("code", 1);
                    state = new JSONObject();
                    state.put("state",2);
                }
                else if(reservedState==3) {
                    toRet.put("code", 1);
                    state = new JSONObject();
                    state.put("state",3);
                }
                toRet.put("Msg",null);
                toRet.put("data",state);

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




