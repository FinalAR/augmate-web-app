import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Label, Input} from 'reactstrap';
import axios from 'axios';
import { CONTENT_DATA } from './testData';

const ContentLinkingModal = ({ isOpen, toggle, rowData }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`your_api_url_here?targetImage=${rowData.targetImage}`);
        setContents(response.data);
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    if (isOpen && rowData) {
      fetchContents();
    }
  }, [isOpen, rowData]);

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
                        width="300"
                        height="300"
                      />
    </div>
    <h6 className='mt-6 mb-1'>  Contents</h6>
    <div className='d-flex justify-content-between'>
        
    {contents.map((content, index) => (
            <div key={index}>
              <Label check>
                <Input type="radio" name="content" />
                <div className="d-flex align-items-center mt-1">
                  <img
                    src={content.imageUrl}
                    alt={content.name}
                    className={content.flag ? "selected" : ""}
                    // onClick={() => handleContentChange(content.id)}
                  />
                </div>
              </Label>
            </div>
          ))}
          </div>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>
        Do Something
      </Button>{' '}
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
  );
};

export default ContentLinkingModal;
