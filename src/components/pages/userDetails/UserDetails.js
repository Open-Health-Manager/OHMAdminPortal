import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import axios from "axios";



import "./UserDetails.css"; // Import styling

function UserDetails() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
    });

    const [resourcesList, setResourcesList] = useState([]);


    const onSubmit = async (data) => {
        console.log(data)
        const response = await axios({
            method: "POST",
            url: "http://localhost:4003/retrieve_all_resources",
            data: data
        });
        var data = response.data;
        console.log(data)
        setResourcesList(data)
    }


    return (
        <Container fluid className="content-block">
            <Row style={{ paddingTop: "20px" }}>
                <Col md={6}>
                    <h1>User Deatils ID Search</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control" {...register("patientID", { required: true })} />
                        {errors.patientID && <p className="error-text">patientID is required</p>}
                        <Button variant='form' type="submit">Submit</Button>
                    </form>
                </Col>
            </Row>
            {resourcesList?.entry &&
                <Row>
                    <Col md={6}>
                        <h2 style={{ paddingTop: "30px" }}>Resources List</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Last Updated</th>
                                    <th>Resource Content URL</th>
                                </tr>
                            </thead>
                            {resourcesList.entry.map((entry, index) => (
                                <tr className="resourceList" key={index}>
                                    <td>{entry.resource.resourceType}</td>
                                    <td>{new Date(entry.resource.meta.lastUpdated).toLocaleString()}</td>
                                    <td><a href={"http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/" + entry.resource.resourceType + "/" + entry.resource.id}>{"http://ohm.healthmanager.pub.aws.mitre.org:8080/fhir/" + entry.resource.resourceType + "/" + entry.resource.id}</a></td>
                                </tr>
                            ))}
                        </table>

                    </Col>
                </Row>
            }
        </Container>
    )
}

export default UserDetails;

