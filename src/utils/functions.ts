import * as Network from "expo-network";

export async function checkNetworkConnection(): Promise<boolean> {
  const networkConnection = (await Network.getNetworkStateAsync())
    .isInternetReachable;
  let networkStatus;

  if (!networkConnection) {
    networkStatus = false;
  } else {
    networkStatus = true;
  }

  console.log(networkStatus);

  return networkStatus;
}
