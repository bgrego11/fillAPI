import { Col, Row } from "reactstrap";
import FB_SVG from "../../assets/svg/FB_SVG";
import INSTAGRAM_SVG from "../../assets/svg/INSTAGRAM_SVG";


const TheFillFooter = () =>
  <footer>
    <Row>
      <Col></Col>
      <Col>
        <p>© GraceMeetsReality. All rights reserved.</p>
      </Col>
      <Col>

        <a style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.facebook.com/thefillapp" rel="noopener noreferrer" target="_blank">
          <FB_SVG color="white" size="16" />
        </a>
        <a style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.instagram.com/christine_thefill/" rel="noopener noreferrer" target="_blank">
          <INSTAGRAM_SVG color="white" size="16" />
        </a>
      </Col>
    </Row>
  </footer>

export default TheFillFooter;