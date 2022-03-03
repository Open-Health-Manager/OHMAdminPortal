const express = require('express'); 
const router = express.Router();
const axios = require('axios');
const https = require('https');

//provide a view of all resources related to a specific patient
router.post('/retrieve_all_resources', function(req, res){

    const { patientID } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    axios({
        method: "GET",
        url: `http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/Patient/${patientID}/$everything`,
        httpsAgent: agent,
    }).then(response => {
        var data = response.data;
        console.log(data)
        res.status(200).json(response.data);
    })
    .catch((err) => {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    });
});

module.exports = router;
