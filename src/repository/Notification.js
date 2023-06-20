import { API_NOTIFICATIONS,API_DETAIL_NOTIFICATIONS,API_SEEN_ALL_NOTIFICATIONS } from "./Type";

export const getNotification = async (access_token) =>{
    try {
        const response = await fetch(API_NOTIFICATIONS,{
            method:"POST",
            headers:{
                Accept: 'application/json',
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                access_token:access_token,
            }),
        });
        const json = await response.json();
        if(json.result?.status){
            const data = json.result.data;
            const unseen = json.result.data.unseen;
            return(data,unseen);
        }else{
            throw new Error('Failed');
        }
    } catch (error) {
        throw new Error('Failed');
    }
};