import javafx.application.Application;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.scene.text.FontSmoothingType;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Screen;
import javafx.stage.Stage;

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

        URL url = this.getClass().getClassLoader().getResource("index.html");
        webEngine.load(url.toString());

        VBox vBox = new VBox(webView);
        Scene scene = new Scene(vBox, screenBounds.getWidth(), screenBounds.getHeight());

        primaryStage.setMaximized(true);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
