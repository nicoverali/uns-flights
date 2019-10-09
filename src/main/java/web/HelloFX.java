package web;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
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

public class HelloFX extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    public void start(Stage primaryStage) {
        primaryStage.setTitle("UNS Flights");
        Rectangle2D screenBounds = Screen.getPrimary().getBounds();

        WebView webView = new WebView();
        webView.setPrefHeight(screenBounds.getHeight());
        webView.setFontSmoothingType(FontSmoothingType.GRAY);

        WebEngine webEngine = webView.getEngine();
        webEngine.getLoadWorker().stateProperty().addListener(
                new ChangeListener() {
                    @Override
                    public void changed(ObservableValue observable, Object oldValue, Object newValue) {
                        if (newValue != Worker.State.SUCCEEDED) { return; }

                        JSObject window = (JSObject) webEngine.executeScript("window");
                        window.setMember("javaSQLBridge", new JavaWebSql());
                    }
                }
        );

        URL url = this.getClass().getClassLoader().getResource("index.html");
        webEngine.load(url.toString());



        VBox vBox = new VBox(webView);
        Scene scene = new Scene(vBox, screenBounds.getWidth(), screenBounds.getHeight());

        primaryStage.setMaximized(true);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
