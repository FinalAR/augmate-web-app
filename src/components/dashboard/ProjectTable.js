import {useState,useEffect} from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table,Button ,Form,FormGroup, Label,Input} from "reactstrap";
import ContentLinkingModal from "./ContentLinkingModal";
// import { TEST_DATA } from "./testData";

const ProjectTables = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/v1/content/fetch');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/content/fetch');
        const json = await response.json();
        console.log(json);
        setData(json.data);
        console.log(data);// Assuming the API response has a 'data' property containing the array of items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    console.log(rowData);
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
{data.map((dataItem) => (
            <tr key={dataItem._id}>
              <td>{dataItem.description}</td>
              <td>
              <div className="d-flex align-items-center p-1">
                      <img
                        src={dataItem.targetImage}
                        className="rounded-circle"
                        alt="avatar"
                        width="50"
                        height="50"
                      />
                    </div>
              </td>
              <td>
              <div className="d-flex align-items-center p-1">
                      <img
                        src={dataItem.contentImage}
                        className="rounded-circle"
                        alt="avatar"
                        width="50"
                        height="50"
                      />
                    </div>
              </td>
              <td>
                  <div className="d-flex gap-3">
                  <button type="button" class="btn btn-outline-success" onClick={() => handleEditClick(dataItem)}>Edit</button>
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
