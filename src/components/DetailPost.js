import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { getPost } from "../store/actions/postAction";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";

const DetailPost = ({ postDetail, getPost }) => {
  const { slug } = useParams();
  const [cookies, setCookie] = useCookies(["count_post"]);

  useEffect(() => {
    getPost(slug);
  }, []);

  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Tech In Asia</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#">Syahrinal M</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {cookies.count_post < 6 && (
        <Container>
          <Row>
            <h5>Author: {postDetail?.author?.display_name}</h5>
          </Row>
          <Row>
            <Col>
              <h1>{postDetail?.seo?.title}</h1>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "5px" }}
          >
            <Col md="auto">
              <img
                src={
                  postDetail?.featured_image?.attachment_meta?.sizes?.medium
                    ?.url ?? "/no-image.jpg"
                }
                alt="Girl in a jacket"
                width="500"
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col>
              <Row>
                <div
                  dangerouslySetInnerHTML={createMarkup(postDetail?.content)}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  postDetail: state.postReducer.postDetail,
});
export default connect(mapStateToProps, { getPost })(DetailPost);
