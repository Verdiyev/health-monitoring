// import React from "react";

// import { StyleSheet, View } from "react-native";
// import { Text, Card, ActivityIndicator } from "react-native-paper";

// import CardTitle from "./card/CardTitle";
// import CardPreview from "./card/CardPreview";
// import CardData from "./card/CardData";

// import { DATA_YELLOW } from "../../constants/colors";
// import { generateData } from "./random";
// import { ChartData, DataTimeframe } from "../charts/ChartDataTypes";
// import { sampleDataWithTimeframe } from "../../utils/SummaryUtils";
// import { readFile, saveFile } from "../../utils/FileUtils";

// const SYS_UNIT = "sys";
// const DIA_UNIT = "dia";

// const FILE_NAME = "BloodPressure";

// const loadData = async (
//   offset: number,
//   setHeartRateData: (x: ChartData[]) => void
// ) => {
//   const content = await readFile(FILE_NAME);

//   if (content.length == 0) {
//     const genData = generateData(60 + offset, 120 + offset, 2000);
//     setHeartRateData(genData);

//     const saveContent = JSON.stringify(genData);
//     saveFile(FILE_NAME, saveContent);
//     return;
//   }

//   // Load existing data in file
//   const loadedData: ChartData[] = JSON.parse(content);
//   setHeartRateData(loadedData);
// };

// export default function BloodPressureCard() {
//   const [sysData, setSysData] = React.useState(generateData(80, 200, 2000));
//   const [diaData, setDiaData] = React.useState(generateData(60, 120, 2000));

//   // React.useEffect(() => {
//   //   if (sysData.length == 0) loadData(0, setSysData);
//   //   if (diaData.length == 0) loadData(-20, setDiaData);
//   // });

//   const [openCard, setOpenCard] = React.useState(false);
//   const [selectedTimeframe, setSelectedTimeframe] =
//     React.useState<DataTimeframe>("5 mins");

//   const displayedSys = sysData.length
//     ? sampleDataWithTimeframe(selectedTimeframe, sysData)
//     : [];
//   const displayedDia = diaData.length
//     ? sampleDataWithTimeframe(selectedTimeframe, diaData)
//     : [];

//   return (
//     <Card style={styles.cardContainer}>
//       <CardTitle
//         text={"Blood Pressure"}
//         icon={"clipboard-pulse-outline"}
//         isOpen={openCard}
//         setOpen={setOpenCard}
//       />

//       {displayedSys.length == 0 ? (
//         <View style={styles.circularLoadingContainer}>
//           <ActivityIndicator />
//         </View>
//       ) : openCard ? (
//         <CardData
//           data={displayedSys}
//           unit={SYS_UNIT}
//           data2={displayedDia}
//           unit2={DIA_UNIT}
//           color={DATA_YELLOW}
//           timeframe={selectedTimeframe}
//           setTimeframe={setSelectedTimeframe}
//         />
//       ) : (
//         <CardPreview
//           data={displayedSys}
//           data2={displayedDia}
//           color={DATA_YELLOW}
//           unit={SYS_UNIT}
//           unit2={DIA_UNIT}
//         />
//       )}
//     </Card>
//   );
// }

// const styles = StyleSheet.create({
//   cardContainer: {
//     padding: 16,
//   },
//   circularLoadingContainer: {
//     height: 100,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
