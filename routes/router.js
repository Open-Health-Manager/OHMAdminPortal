const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');

//provide a view of all resources related to a specific patient
router.post('/retrieve_all_resources', function (req, res) {

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

//provide a patient data receipt related to a specific patient
router.post('/retrieve_patient_data_receipts', function (req, res) {

    const { patientID } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "GET",
        url: `http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/MessageHeader?focus=Patient/${patientID}`,
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


//provide a view of patient resource via a username
router.post('/search_username', function (req, res) {

    const { userName } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "GET",
        url: `http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/Patient?identifier=urn%3Amitre%3Ahealthmanager%3Aaccount%3Ausername%7C${userName}`,
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
