import {useState} from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table,Button ,Form,FormGroup, Label,Input} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import ContentLinkingModal from "./ContentLinkingModal";

const tableData = [
  {
    avatar: user1,
    name: "Ant",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    content: user3,
    target: user2,
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Goat",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    content: user1,
    target: user4,
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Deer",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    content: user4,
    target: user5,
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Mango",
    email: "hgover@gmail.com",
    project: "Flexy React",
    target: user2,
    content: user5,
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Caffete",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    target: user1,
    content: user1,
    budget: "95K",
  },
];

const ProjectTables = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleModal = () => {
    console.log("Faalil");
    setModalOpen(!modalOpen);
  };
  
  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    toggleModal();
  };


  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
          <CardTitle tag="h5">Content Management</CardTitle>
          <Form>
  <FormGroup>
    <Label
      for="searchConntent"
      hidden
    >
      Email
    </Label>
    <Input
    bsSize="sm"
      id="searchContent"
      name="searchContent"
      placeholder="Search Content"
      type="text"
    />
  </FormGroup>
  </Form>
          <Button className="btn" color="primary">Add a New Content</Button>
          </div>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Target Name</th>
                <th>Target Image</th>

                <th>Content</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>{tdata.name}</td>
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      {/* <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div> */}
                    </div>
                  </td>
                  <td>
                 <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.content}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      {/* <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div> */}
                    </div>
                  </td>

                  <td>
                  <div className="d-flex gap-3">
                  <button type="button" class="btn btn-outline-success" onClick={() => handleEditClick(tdata)}>Edit</button>
                  <button type="button" class="btn btn-outline-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ContentLinkingModal isOpen={modalOpen} toggle={toggleModal} rowData={selectedRow} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
