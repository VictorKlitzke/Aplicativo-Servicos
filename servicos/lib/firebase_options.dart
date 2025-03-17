import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAdxc_PZwbpYbCrsdd-wmIGxh_38F-0BAM',
    appId: '1:434740252164:web:603af78e8fb9bf2980af51',
    messagingSenderId: '434740252164',
    projectId: 'aplicativo-services',
    authDomain: 'aplicativo-services.firebaseapp.com',
    storageBucket: 'aplicativo-services.appspot.com',
    measurementId: 'G-BE3NQ8SWXL',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyBJUsShgpD5g2N9pna6JoJN5UXkix4iEV8',
    appId: '1:434740252164:android:b0c2ae880848a5ba80af51',
    messagingSenderId: '434740252164',
    projectId: 'aplicativo-services',
    storageBucket: 'aplicativo-services.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAqCIrs5YLrCpYwlZeYzdcLqf_T5x5T34E',
    appId: '1:434740252164:ios:572e1c6312a79c5280af51',
    messagingSenderId: '434740252164',
    projectId: 'aplicativo-services',
    storageBucket: 'aplicativo-services.appspot.com',
    iosClientId:
        '434740252164-rauehniabopb1lfgplb7qeba9g7bcc9e.apps.googleusercontent.com',
    iosBundleId: 'com.example.servicos',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyAqCIrs5YLrCpYwlZeYzdcLqf_T5x5T34E',
    appId: '1:434740252164:ios:572e1c6312a79c5280af51',
    messagingSenderId: '434740252164',
    projectId: 'aplicativo-services',
    storageBucket: 'aplicativo-services.appspot.com',
    iosClientId:
        '434740252164-rauehniabopb1lfgplb7qeba9g7bcc9e.apps.googleusercontent.com',
    iosBundleId: 'com.example.servicos',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyAdxc_PZwbpYbCrsdd-wmIGxh_38F-0BAM',
    appId: '1:434740252164:web:9fb201432fbc165280af51',
    messagingSenderId: '434740252164',
    projectId: 'aplicativo-services',
    authDomain: 'aplicativo-services.firebaseapp.com',
    storageBucket: 'aplicativo-services.appspot.com',
    measurementId: 'G-LZ445P07S8',
  );
}
