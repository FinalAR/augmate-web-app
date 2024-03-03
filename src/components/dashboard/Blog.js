import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button
} from "reactstrap";
import { useNavigate } from "react-router-dom";
const Blog = (props) => {
  const navigate = useNavigate();
  return (
    <Card>
      <img
        placeholder={require('../../assets/images/bg/bg1.jpg')}
        alt="Image target"
        src={props.image}
        style={{height: "200px",objectFit:"cover"}}
      />
      <CardBody className="p-4" >
        <CardTitle tag="h5" >{props.title}</CardTitle>
        <CardText className="mt-3" style={{ height: "30px" }}>{props.text}</CardText>
        <Button color={props.color} onClick={() => { navigate("/ContentUpload", { state: { imageId: props.imageId, title: props.title , image:props.image} }); }}>Add AR content</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
