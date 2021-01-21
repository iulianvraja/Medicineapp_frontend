import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    ing: '/ingrijitor'
};

function getIngrijitor(callback) {
    let request = new Request(HOST.backend_api + endpoint.ing, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getIngrijitorById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.ing + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postIngrijitor(user, callback){
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

function deleteingrijitor(nume,callback) {
    let request=new Request(HOST.backend_api+endpoint.ing+'${nume}', {
        method: 'DELETE',
    });

    RestApiClient.performRequest(request, callback);
}




function updateIngrijitor(user,callback){
    let request = new Request(HOST.backend_api + endpoint.ing , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    });
    RestApiClient.performRequest(request, callback);
}

export {
    getIngrijitor,
    getIngrijitorById,
    postIngrijitor,
    deleteingrijitor,
    updateIngrijitor
};
