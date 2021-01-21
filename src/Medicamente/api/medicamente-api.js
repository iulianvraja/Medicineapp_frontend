import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    ing: '/medicamente'
};

function getMedicament(callback) {
    let request = new Request(HOST.backend_api + endpoint.ing, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicamentById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.ing + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicament(user, callback){
    let request = new Request(HOST.backend_api + endpoint.ing , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteMedicament(nume,callback) {
    let request=new Request(HOST.backend_api+endpoint.ing+'${nume}', {
        method: 'DELETE',
    });

    RestApiClient.performRequest(request, callback);
}



export {
    getMedicament,
    getMedicamentById,
    postMedicament,
    deleteMedicament,

};
