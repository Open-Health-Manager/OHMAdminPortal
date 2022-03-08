import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import axios from "axios";



import "./UserDetails.css"; // Import styling

function UserDetails() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
    });

    const [resourcesList, setResourcesList] = useState([]);
    const [patientDataReceiptsList, setPatientDataReceiptsList] = useState([]);



    const onSubmit = async (data) => {
        console.log(data)
        const response = await axios({
            method: "POST",
            url: "http://localhost:4003/search_username",
            data: data
        });
        var data = response.data;
        console.log(data.entry[0].resource.id)
        await patient_data_receipt_list(data.entry[0].resource.id)
        await resource_list(data.entry[0].resource.id)
    }

    const resource_list = async (patientID) => {
        console.log(patientID)
        const response = await axios({
            method: "POST",
            url: "http://localhost:4003/retrieve_all_resources",
            data: {
                patientID: patientID
            },
        })
        var data = response.data;
        console.log(data)
        setResourcesList(data)
        console.log("resource list retrieval succesful");
    }

    const patient_data_receipt_list = async (patientID) => {
        console.log(patientID)
        const response = await axios({
            method: "POST",
            url: "http://localhost:4003/retrieve_patient_data_receipts",
            data: {
                patientID: patientID
            },
        })
        var data = response.data;
        console.log(data)
        setPatientDataReceiptsList(data)
        console.log("patient data receipt list retrieval succesful");
    }

    return (
        <Container fluid className="content-block">
            <Row style={{ paddingTop: "20px" }}>
                <Col md={6}>
                    <h1>User Details Search</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control" {...register("userName", { required: true })} />
                        {errors.userName && <p className="error-text">user name is required</p>}
                        <Button variant='form' type="submit">Submit</Button>
                    </form>
                </Col>
            </Row>
            {patientDataReceiptsList?.entry &&
                <Row>
                    <Col md={6}>
                        <h2 style={{ paddingTop: "30px" }}>Patient Data Receipts List</h2>

                        <Table striped bordered hover variant="dark" responsive="lg">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Last Updated</th>
                                    <th>Bundle URL</th>
                                    <th>Resource Content URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientDataReceiptsList.entry.map((entry, index) => (
                                    <tr className="tableList" key={index}>
                                        <td>{entry.resource.resourceType}</td>
                                        <td>{new Date(entry.resource.meta.lastUpdated).toLocaleString()}</td>
                                        <td><a href={"http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/" + entry.resource.focus[1].reference}>{"http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/" + entry.resource.focus[1].reference}</a></td>
                                        <td><a href={entry.fullUrl}>{entry.fullUrl}</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            }
            {resourcesList?.entry &&
                <Row>
                    <Col md={6}>
                        <h2 style={{ paddingTop: "30px" }}>Resources List</h2>

                        <Table striped bordered hover variant="dark" responsive="lg">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Last Updated</th>
                                    <th>Resource Content URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resourcesList.entry.map((entry, index) => (
                                    <tr className="tableList" key={index}>
                                        <td>{entry.resource.resourceType}</td>
                                        <td>{new Date(entry.resource.meta.lastUpdated).toLocaleString()}</td>
                                        <td><a href={entry.fullUrl}>{entry.fullUrl}</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            }
        </Container>
    )
}

export default UserDetails;

