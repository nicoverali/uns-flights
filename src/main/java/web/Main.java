package web;

public class Main {

    public static void main(String[] args){

        WebViewCreator.init(args);

        /**
        JavaWebSql base = new JavaWebSql();
        

        /**
         String ret = base.connectToAdmin("admin");
        String ret2= base.showTables();
        System.out.println(ret2.toString());
        String ret3 = base.describeTable("aeropuertos");
        System.out.println(ret3.toString());
        String ret4 = base.adminQuery("select * from reserva_vuelo_clase");
        System.out.println(ret4.toString());
        String ret5 = base.ubicaciones();
        System.out.println(ret5.toString());
        System.out.println(Hash.md5("pepe"));
        String ret6= base.executeUpdate("drop table posee;");
        System.out.println(ret6.toString());
        String ret7= base.executeUpdate("insert into ubicaciones (pais,estado,ciudad,huso) values ('Suarez','Bs.As','pepi',0);");
        System.out.println(ret7.toString());




            String ret8=base.execute("show databases;");
            System.out.println(ret8.toString());
         **/
    }
}
