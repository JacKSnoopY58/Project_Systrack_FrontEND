import { API_POST } from "../api";

export const CctvProvider = {
    createCctv: async (ipcAddress, ipcName, ipcStatus, cctvPlaceId) => {
        console.log(cctvPlaceId);
        let json = await API_POST("cctv/create", {
            ipc_address: ipcAddress,
            ipc_name: ipcName,
            ipc_status: ipcStatus,
            place_id: cctvPlaceId
            
        });

        console.log(json);

        return json;
    },

    updateCctv: async (ipcId, ipAddress, ipcName, ipcStatus, cctvPlaceId) => {

        var json = await API_POST("cctv/update",{
            ipc_id: ipcId,
            ipc_address: ipAddress,
            ipc_name: ipcName,
            ipc_status: ipcStatus,
            place_id: cctvPlaceId
        });
        
        return json;
    },

    deleteCctv: async (ipcId) => {
        let json = await API_POST("cctv/delete", {
            ipc_id: ipcId
        });

        return json;
    },
}