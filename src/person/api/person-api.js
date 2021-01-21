import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

export {
    getPersons,
    getPersonById,
    postPerson

};
const endpoint = {
    person: '/pacient'
};

function getPersons(callback) {
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPersonById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.person + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPerson(user,callback){
    let request = new Request(HOST.backend_api + endpoint.person , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),

    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}




