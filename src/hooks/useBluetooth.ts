import React from "react";
import { platformApiLevel } from "expo-device";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

const DEVICE_UUID = "";
const DEVICE_CHARACTERISTIC = "";

type BluetoothAPI = {
  requestPermissions: () => Promise<boolean>;
  scanForDevices: () => void;
  devices: Device[];
  connectToDevice: (d: Device) => Promise<void>;
  connectedDevice: Device | null;
  disconnectDevice: () => void;
};

const requestPermissions = async (): Promise<boolean> => {
  // Permissions immediately gets requested at start of app
  if (Platform.OS == "ios") return true;

  // Platform OS ANDROID
  if ((platformApiLevel ?? -1) < 31) {
    const belowAndroid31 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Bluetooth Scan Permission",
        message: "VitaSense requires fine location access",
        buttonPositive: "Ok",
      }
    );
    return belowAndroid31 == "granted";
  }

  // Android API level >= 31
  const bluetoothScanPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: "Bluetooth Scan Permission",
      message: "VitaSense requires bluetooth scanning",
      buttonPositive: "Ok",
    }
  );
  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "Bluetooth Scan Permission",
      message: "VitaSense requires to connect to bluetooth",
      buttonPositive: "Ok",
    }
  );
  const accessFineLocationPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Bluetooth Scan Permission",
      message: "VitaSense requires fine location access",
      buttonPositive: "Ok",
    }
  );

  return (
    bluetoothScanPermission == "granted" &&
    bluetoothConnectPermission == "granted" &&
    accessFineLocationPermission == "granted"
  );
};

const isDuplicatedDevice = (devices: Device[], nextDevice: Device) =>
  devices.findIndex((device) => nextDevice.id === device.id) > -1;

const useBluetooth = (): BluetoothAPI => {
  const bleManager = React.useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = React.useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = React.useState<Device | null>(
    null
  );
  const deviceList: Device[] = [];

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      console.log("Scanning for bluetooth device... \n");

      if (error) {
        console.log(error.message);
        return;
      }

      if (device) {
        if (!isDuplicatedDevice(deviceList, device)) {
          deviceList.push(device);
        }
        // setAllDevices((prevDeviceList) => {
        //   return isDuplicteDevice(prevDeviceList, device)
        //     ? prevDeviceList
        //     : [...prevDeviceList, device];
        // });
        console.log(deviceList.length);
        deviceList.forEach((d) =>
          console.log(d.id, d.localName, d.serviceUUIDs)
        );
        console.log(device.id, device.localName, device.serviceUUIDs);
      }
    });
  };

  const connectToDevice = async (device: Device) => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);
      setConnectedDevice(connectedDevice);

      await connectedDevice.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();

      startStreamingData(connectedDevice);
    } catch (error) {
      console.log("Error connecting to:", device.id, error);
    }
  };

  const onReceiveData = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.log(error);
      return;
    }

    if (!characteristic?.value) {
      console.log("No data received!");
      return;
    }

    const rawData = characteristic.value;
    // const rawData = base64.decode(characteristic.value);
    // Do some bit shifting here to decode value further
    //TODO: Set data to rawData!!!
    //TODO: Expose data to the hook
  };

  const startStreamingData = async (device: Device) => {
    if (!device) console.log("No device connected");

    device.monitorCharacteristicForService(
      DEVICE_UUID,
      DEVICE_CHARACTERISTIC,
      onReceiveData
    );
  };

  const disconnectDevice = () => {
    if (!connectedDevice) return;

    bleManager.cancelDeviceConnection(connectedDevice.id);
    setConnectedDevice(null);
    //TODO: Set data back to 0/null !!!
  };

  return {
    requestPermissions: requestPermissions,
    scanForDevices: scanForDevices,
    devices: allDevices,
    connectToDevice: connectToDevice,
    connectedDevice: connectedDevice,
    disconnectDevice: disconnectDevice,
  };
};

export default useBluetooth;
