import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal, setNewRoot, setNewChildRoot, deleteRoot } from '../actions/action';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { Button, Col, Modal, Row, Collapse, Fade } from 'react-bootstrap';


export default function Home() {
    const dispatch = useDispatch();
    const [addModal, setAddModal] = useState(false);
    const [addRootModal, setAddRootModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [parentID, setParentID] = useState();
    var RootData = useSelector(state => state.tree.Root);

    var childRoot = useSelector(state => state.tree.ChildRoot);

    console.log("RootData :", RootData, "childRoot :", childRoot, "parent id:", parentID, "filter:", childRoot.filter(todo => todo.parentId !== RootData.id));
    function saveLocalStroge() {
        localStorage.setItem('RootData', RootData);
        localStorage.setItem('ChildData', childRoot);
    }
    function cleanLocalStroge() {
        RootData = localStorage.removeItem('RootData');
        childRoot = localStorage.removeItem('ChildData');
    }
    useEffect(() => {
        RootData = localStorage.getItem('RootData');
        childRoot = localStorage.getItem('ChildData');
    }, [])

    return (
        <div className="App">
            <Row>
                <div style={{ marginLeft: 15 }}>
                    <Button variant='primary' style={{ width: 80, marginTop: 15 }} onClick={() => saveLocalStroge()}>Save</Button>
                    <Button variant="danger" style={{ width: 80, marginTop: 15, marginLeft: 10 }} onClick={() => setAddRootModal(true)}>Add</Button>
                    <Button variant='danger' style={{ width: 80, marginTop: 15, marginLeft: 10 }} onClick={() => cleanLocalStroge()}>Temizle</Button>

                </div>
            </Row>
            <Row>
                {RootData.length > 0
                    && RootData.map((data) => (<>
                        <Col span={16}>
                            <div className='treeContanier'>
                                <div style={{ marginTop: 25, width: 300 }}>
                                    <Tree
                                        key={data.id}
                                        label={
                                            <div style={{
                                                marginLeft: 20,
                                                marginRight: 20,
                                                width: "auto",
                                                padding: "10px",
                                                backgroundColor: "#32323221",
                                                boxShadow: "-6px 5px 17px 1px rgba(0,0,0,0.43)",
                                                borderRadius: "5px"
                                            }}>
                                                <CgProfile style={{ fontSize: "80px" }} />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Col>
                                                        <Row>
                                                            <p>Name: <input type="text" value={data.name} /></p>
                                                        </Row>
                                                        <Row>
                                                            <p>Self  :  <input type="text" value={data.self} /></p>
                                                        </Row>
                                                        <Row>
                                                            <p>Total: <input type="text" value={data.self} /></p>
                                                        </Row>
                                                    </Col>
                                                    <div style={{ position: "absolute", right: 5, top: 10 }}>
                                                        <a data-toggle="collapse"
                                                            onClick={() => setVisible(!visible)}
                                                            aria-controls={data.id} aria-expanded={visible}
                                                        ><HiOutlineDotsVertical style={{ fontSize: "20px" }} /></a>
                                                        <Fade in={visible}>
                                                            <div id={data.id}
                                                                style={{
                                                                    position: "absolute", display: "block", width: "150px",
                                                                    padding: "10px",
                                                                    backgroundColor: "#32323221",
                                                                    boxShadow: "-6px 5px 17px 1px rgba(0,0,0,0.43)",
                                                                    borderRadius: "5px"
                                                                }}>
                                                                <a style={{ cursor: "pointer" }} onClick={() => { setParentID(data.id); setAddModal(true) }}>Add a downline</a>
                                                                <hr />
                                                                <a style={{ cursor: "pointer" }} onClick={() => dispatch(deleteRoot(data.id))}>Delete</a>
                                                                <hr />
                                                                <a>Request income</a>
                                                            </div>
                                                        </Fade>
                                                    </div>

                                                </div>
                                            </div>}>
                                        {childRoot.length > 0 && childRoot.filter(todo => todo.parentId !== RootData.id).map((ChildData) =>
                                            <TreeNode
                                                label={<div style={{
                                                    width: "auto",
                                                    padding: "10px",
                                                    backgroundColor: "#32323221",
                                                    boxShadow: "-6px 5px 17px 1px rgba(0,0,0,0.43)",
                                                    borderRadius: "5px"
                                                }}>
                                                    <CgProfile style={{ fontSize: "80px" }} />
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <Col>
                                                            <Row>
                                                                <p>Name: <input type="text" value={ChildData.name} /></p>
                                                            </Row>
                                                            <Row>
                                                                <p>Self  :  <input type="text" value={ChildData.self} /></p>
                                                            </Row>
                                                            <Row>
                                                                <p>Total: <input type="text" value={ChildData.self} /></p>
                                                            </Row>
                                                        </Col>
                                                        <div style={{ position: "absolute", right: 5, top: 10 }}>
                                                            <a data-toggle="collapse"
                                                                onClick={() => setVisible(!visible)}
                                                                aria-controls={ChildData.id} aria-expanded={visible}
                                                            ><HiOutlineDotsVertical style={{ fontSize: "20px", marginRight: 20 }} /></a>
                                                            <Fade in={visible}>
                                                                <div
                                                                    id={ChildData.id}
                                                                    style={{
                                                                        position: "absolute", display: "block", width: "150px",
                                                                        padding: "10px",
                                                                        backgroundColor: "#32323221",
                                                                        boxShadow: "-6px 5px 17px 1px rgba(0,0,0,0.43)",
                                                                        borderRadius: "5px"
                                                                    }}>
                                                                    <a style={{ cursor: "pointer" }} onClick={() => { setParentID(ChildData.id); setAddModal(true) }}>Add a downline</a>
                                                                    <hr />
                                                                    <a style={{ cursor: "pointer" }} onClick={() => dispatch(deleteRoot(ChildData.id))}>Delete</a>
                                                                    <hr />
                                                                    <a>Request income</a>
                                                                </div>
                                                            </Fade>
                                                        </div>

                                                    </div>
                                                </div>} />)}
                                        {/* <TreeNode label={<div>Child 1</div>}>
                                            <TreeNode label={<div>Grand Child</div>} />
                                            <TreeNode label={<div>Grand Child</div>} />
                                        </TreeNode> */}
                                    </Tree>
                                </div>
                            </div>
                        </Col></>))}
            </Row>
            <Modal show={addModal} onHide={() => setAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Child</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ name: '', self: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                dispatch(setNewChildRoot({ ...values, parentId: parentID, id: (childRoot.length > 0 ? childRoot[childRoot.length - 1].id + (`C` + 1) : (`C` + 1)) }))
                                setAddModal(false)
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Col>
                                    <Row>
                                        <p>Name: <Field type="text" name="name" /></p>
                                    </Row>
                                    <Row>
                                        <p>Self :  <Field type="text" name="self" /></p>
                                    </Row>
                                </Col>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <Modal show={addRootModal} onHide={() => setAddRootModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>AddRoot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ name: '', self: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(setNewRoot({ ...values, id: (RootData.length > 0 ? RootData[RootData.length - 1].id + 1 : 1) }))
                            setAddRootModal(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Col>
                                    <Row>
                                        <p>Name: <Field type="text" name="name" /></p>
                                    </Row>
                                    <Row>
                                        <p>Self  :  <Field type="text" name="self" /></p>
                                    </Row>
                                </Col>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
}
