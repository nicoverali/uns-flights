package web;
import logic.JavaWebSql;

public class Main {

    public static void main(String[] args){

        //HelloFX.main(args);

        JavaWebSql base = new JavaWebSql();



        String ret = base.connectToAdmin("admin");


        String ret4 = base.makeTwoWayReservation("BC1","2020-01-02","Ejecutiva","DNI",
                1,101,"CB2","2020-01-05","Turista");
        System.out.println("El procedure es::"+ret4.toString());


        /**
         String ret2= base.showTables();
         String ret3 = base.makeOneWayReservation("BC1","2020-01-02","Ejecutiva","DNI",
         1,101);
         System.out.println("El procedure es::"+ret3.toString());

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

         String ret8=base.executeSelect("select * from salidas;");
         System.out.println(ret8.toString());
         String ret9 = base.describeTable("salidas");
         System.out.println(ret9);


         **/





    }

}
