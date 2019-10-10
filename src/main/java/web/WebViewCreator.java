package web;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.concurrent.Worker;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.scene.text.FontSmoothingType;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Screen;
import javafx.stage.Stage;
import logic.JavaWebSql;
import netscape.javascript.JSObject;

import java.net.URL;

public class WebViewCreator extends Application {

    public static void init(String[] args) {
        launch(args);
    }

    public void start(Stage primaryStage) {
        Rectangle2D screenBounds = Screen.getPrimary().getBounds();
        URL url = this.getClass().getClassLoader().getResource("index.html");


        WebView webView = new WebView();

        webView.setPrefHeight(screenBounds.getHeight());
        webView.setFontSmoothingType(FontSmoothingType.GRAY);

        WebEngine webEngine = webView.getEngine();
        webEngine.setUserAgent("JAVAFX");
        webEngine.load(url.toString());

        // Add the Java-JS communication bridge object into the JS window object
        webEngine.getLoadWorker().stateProperty().addListener(
                (ChangeListener<? super Worker.State>) (observable, oldValue, newValue) -> {
                    if (newValue != Worker.State.SUCCEEDED) { return; }

                    JSObject window = (JSObject) webEngine.executeScript("window");
                    window.setMember("javaSQLBridge", new JavaWebSql());
                }
        );

        Scene scene = new Scene(new VBox((webView)), screenBounds.getWidth(), screenBounds.getHeight());
        primaryStage.setTitle("UNS Flights");
        primaryStage.setMaximized(true);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
