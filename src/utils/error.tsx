import axios from "axios"



const getErrorMessage = (err:unknown):string =>{
    if(axios.isAxiosError(err)){
        if(err.response?.data?.message){
            return err.response.data.message
        }
        if(err.response?.data){
            return typeof err.response.data ==='string' ?  err.response.data : JSON.stringify(err.response.data);
        }
        return err.message || 'ネットワークエラーが発生しました。';
    }
    return '予期せぬエラーが発生しました。';
}

export default getErrorMessage;