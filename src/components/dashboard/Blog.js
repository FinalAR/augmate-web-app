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
        style={{ height: "200px", objectFit: "cover" }}
      />
      <CardBody className="p-4" >
        <CardTitle tag="h5" >{props.title}</CardTitle>
        <CardText className="mt-3" style={{fontWeight: "bolder"}}>Available contents:</CardText>
        {props.contents?.map((obj, index) => (
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems: "center", width: "100%"}}> 
            <CardText  className="mt-3" style={{ height: "30px" }}>{obj.element.description}</CardText>
            <img
            key={index}
              placeholder={require('../../assets/images/bg/bg1.jpg')}
              alt="Image target"
              src={obj.element.contentImage}
              style={{ height: "40px", width: "40px", objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        ))}
        <Button color={props.color} onClick={() => { navigate("/ContentUpload", { state: { title: props.title, image: props.image, compileFile: props.compileFileUrl, contents: props.contents, targetpHash: props.targetpHash, docID: props.docID } }); }}>Add AR content</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
