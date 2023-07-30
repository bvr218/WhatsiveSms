import axios from "axios";
export const functions = {
    validaInstancia: async function(port,token){
        try {
            const response = await axios.get(
              "https://api.whatsive.com/api/v1/smsInstancia?action=getInstancia&token="+token+"&id="+port
            );
            return {salida:"exito",response:response.data};
        } catch (error) {
            console.log(error);
            return {salida:"error"};
        }
    }
}