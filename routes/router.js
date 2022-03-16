const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');


//provide a view of patient resource via a username
router.post('/search_username', function (req, res) {

    console.log("req", req.body);
    const { userName } = req.body;
    const { server } = req.body;
    console.log("req", req.body);
    console.log(`${server}Patient?identifier=urn%3Amitre%3Ahealthmanager%3Aaccount%3Ausername%7C${userName}`)

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "GET",
        url: `${server}Patient?identifier=urn%3Amitre%3Ahealthmanager%3Aaccount%3Ausername%7C${userName}`,
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

//provide a view of all resources related to a specific patient
router.post('/retrieve_all_resources', function (req, res) {

    const { patientID } = req.body;
    const { server } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "GET",
        url: `${server}Patient/${patientID}/$everything`,
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
    const { server } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "GET",
        url: `${server}MessageHeader?focus=Patient/${patientID}`,
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


//delete the MessageHeader instance of a patient data receipt
router.delete('/delete_messageHeader', function (req, res) {

    const { messageHeaderID } = req.body;
    const { server } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "DELETE",
        url: `${server}${messageHeaderID}`,
        httpsAgent: agent,
    }).then(response => {
        console.log(response);
        if (response.status == 200) {
            console.log("sucessfully removed message header of patient data receipt")
            res.status(200).json(response.data);
        }
    })
        .catch((err) => {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        });
});


//delete the bundle instance of a patient data receipt
router.delete('/delete_bundle', function (req, res) {

    const { bundleID } = req.body;
    const { server } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "DELETE",
        url: `${server}${bundleID}`,
        httpsAgent: agent,
    }).then(response => {
        if (response.status == 200) {
            console.log("sucessfully removed bundle instance of patient data receipt")
            res.status(200).json(response.data);
        }
    })
        .catch((err) => {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        });
});

//delete the bundle instance of a patient data receipt
router.post('/rebuild_account', function (req, res) {

    const { username } = req.body;
    const { server } = req.body;
    console.log("req", req.body);

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios({
        method: "POST",
        url: `${server}$rebuild-account`,
        httpsAgent: agent,
        data: {
            resourceType: "Parameters",
            parameter: [ {
                name: "username",
                valueString: username
              } ]
          },
    }).then(response => {
        if (response.status == 200) {
            console.log("sucessfully rebuilt account: ", username)
            res.status(200).json(response.data);
        }
    })
        .catch((err) => {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        });
});


module.exports = router;
