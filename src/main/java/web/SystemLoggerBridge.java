package web;

public class SystemLoggerBridge {

    public void logError(String error){
        System.err.println(error);
    }

    public void log(String msg){
        System.out.println(msg);
    }

}
