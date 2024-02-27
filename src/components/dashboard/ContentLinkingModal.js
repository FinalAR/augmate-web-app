import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Label, Input} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContentLinkingModal = ({ isOpen, toggle, rowData,  updateTableData }) => {
  const [contents, setContents] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState(rowData ? rowData._id : null);
  const [selectedContentData, setSelectedContentData] = useState(null);


  const fetchContents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/content/linking/${rowData.targetpHash}`);
      setContents(response.data.data);
      setSelectedContentId(rowData._id);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  useEffect(() => {
    // Find the content with flag set to true and set its ID as the selectedContentId
    const selectedContent = contents.find(content => content.flag);
    if (selectedContent) {
      setSelectedContentId(selectedContent._id);
      setSelectedContentData(selectedContent);
    }
  }, [contents]);

  useEffect(() => {
    if (isOpen && rowData) {
      fetchContents();
    }
  }, [isOpen, rowData]);

  const handleContentChange = (contentId) => {
    setSelectedContentId(contentId);
    console.log(contentId);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/content/linking/${rowData.targetpHash}?documentId=${selectedContentId}&flag=true`);
      setContents([]);
      fetchContents();
      updateTableData(selectedContentData);
      toast.success('Content updated successfully'); 
      
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };
  
  const handleReset = () => {
    const selectedContent = contents.find(content => content.flag);
    if (selectedContent) {
      setSelectedContentId(selectedContent._id);
    }
  };

  if (!rowData) {
    return null; // Render nothing if rowData is null
  }
 
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}></ModalHeader>
    <ModalBody>
     <div className='d-flex justify-content-center align-items-center p-3'>
     <img
                        src={rowData.targetImage}
                        className="rounded-circle"
                        alt="avatar"
                        width="250"
                        height="250"
                      />
    </div>
    <h5 className='mt-1 mb-2'>  Contents</h5>
    <div className='d-flex justify-content-between'>
        
    {contents.map((content) => (
            <div key={content._id} style={{ flex: '0 0 30%', maxWidth: '30%' }}>
              <Label check>
                <Input type="radio" name="content"
                checked={content._id === selectedContentId}
                onChange={() => handleContentChange(content._id)} /> {content.description}
                <div className="d-flex align-items-center mt-1">
                  <img
                    src={content.contentImage}
                    alt={content.name}
                    width="150"
                    height="150"
                  />
                </div>
              </Label>
            </div>
          ))}
          </div>
    </ModalBody>
    <ModalFooter>
    <Button color="secondary" onClick={handleReset}>
        Reset
      </Button>
      <Button color="primary" onClick={handleSubmit}>
        Change
      </Button>{' '}
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
  );
};

export default ContentLinkingModal;
