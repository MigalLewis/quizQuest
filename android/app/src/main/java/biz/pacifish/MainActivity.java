package biz.pacifish;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;

import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initializes the Bridge
        // this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
        // // Additional plugins you've installed go here
        // add(GoogleAuth.class);
        // }});
        this.registerPlugin(GoogleAuth.class);
  }
}
