# VitaSense

## Health monitoring mobile application built with React Native

This project is part of EG2605 Undergraduate Research Opportunities Programme (UROP) undertaken during Year 2 Semester 2.

Features:

- View live raw sound data from sensors
- Display processed data
  - Heart Rate
  - Blood Pressure
  - Respiratory Rate
- Store and view historic data
  - Stored as ranges and averages over different intervals

### Installation

Firstly, install the necessary packages to build the project via NPM

```
npm install
```

Since this project requires bluetooth to receive data, the Expo Go app cannot be used for development. Instead, you have to build and develop using the native apps. Run the following command to build the native android and ios files:

```
npx expo prebuild
```

#### Android

Install `Android NDK` via Android Studio for Skia to build natively using C++. Next, specify the android sdk path by creating a file named `local.properties` in the android folder and adding the following entry:

```
sdk.dir = C://Users//USERNAME//AppData//Local//Android//Sdk
```

#### IOS

Need MacOS to compile!
