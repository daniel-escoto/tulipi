import { Platform } from "react-native";

// Production
let baseUrl = "https://tulipi-server.herokuapp.com/api/v1/";

// Development
// let baseUrl = "";

// {
//   Platform.OS == "android"
//     ? (baseUrl = "http://10.0.2.2:3000/api/v1/")
//     : (baseUrl = "http://192.168.1.143:3000/api/v1/");
// }

export default baseUrl;
