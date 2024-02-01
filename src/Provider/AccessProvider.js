import { API_POST } from "../api";

export const AccessProvider = {
    createAccess: async (acIp, acName, acPlaceId) => {
        let json = await API_POST("AccessControl/create", {
            ac_ip: acIp,
            ac_device_name: acName,
            place_id: acPlaceId
        });

        return json;
    },

    updateAccess: async (acId, acIp, acName, acPlaceId) => {

        var json = await API_POST("AccessControl/update",{
            ac_id: acId,
            ac_ip: acIp,
            ac_device_name: acName,
            place_id: acPlaceId
        });
        
        return json;
    },

    deleteAccess: async (acId) => {
        let json = await API_POST("AccessControl/delete", {
            ipc_id: acId
        });

        return json;
    },
}