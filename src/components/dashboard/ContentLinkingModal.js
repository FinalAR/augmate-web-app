import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Label, Input} from 'reactstrap';

const ContentLinkingModal = ({ isOpen, toggle, rowData }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}></ModalHeader>
    <ModalBody>
     <div className='d-flex justify-content-center align-items-center'>
     <img
                        src={rowData.avatar}
                        className="rounded-circle"
                        alt="avatar"
                      />
    </div>
    <h6 className='mt-6 mb-1'>  Contents</h6>
    <div className='d-flex justify-content-between'>
        
        <div>
        <Label check>
                <Input
                  type="radio"
                  name="content"
                /> {rowData.name}
                <div className="d-flex align-items-center mt-1">
                <img
                  src={rowData.content}
                //   alt={content.name}
                //   className={selectedContent === content.id ? "selected" : ""}
                //   onClick={() => handleContentChange(content.id)}
                />
                </div>
              </Label>
        </div>
        <div>
        <img
                        src={rowData.target}
                        className="rounded-circle"
                        alt="avatar"
                      />
        </div>
        <div>
        <img
                        src={rowData.target}
                        className="rounded-circle"
                        alt="avatar"
                      />
        </div>
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
