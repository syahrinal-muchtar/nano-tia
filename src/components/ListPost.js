import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { getPosts } from "../store/actions/postAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCookies } from "react-cookie";

const ListPost = ({ posts, page, getPosts }) => {
  const [cookies, setCookie] = useCookies(["count_post", "expired_paywalled"]);
  const per_page = 10;

  const countView = () => {
    if (cookies.count_post) {
      setCookie("count_post", cookies.count_post + 1, {
        expires: new Date(cookies.expired_paywalled),
      });
    } else {
      var expDate = new Date();
      expDate.setDate(expDate.getDate() + 30);
      setCookie("count_post", 1, { expires: expDate });
      setCookie("expired_paywalled", expDate, { expires: expDate });
    }
  };

  useEffect(() => {
    getPosts({
      page,
      per_page,
    });
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      getPosts({
        page,
        per_page,
      });
    }, 1500);
  };

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
      <Container>
        <Row>
          <Col>
            <h1>Latest Stories</h1>
          </Col>
        </Row>

        <InfiniteScroll
          dataLength={posts.length}
          next={() => fetchMoreData()}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {posts.map((item, index) => (
            <Row style={{ marginBottom: "5px" }} key={index}>
              <Col>
                <img
                  src={
                    item?.featured_image?.attachment_meta?.sizes?.medium?.url ??
                    "/no-image.jpg"
                  }
                  alt="Girl in a jacket"
                  width="300"
                />
              </Col>
              <Col>
                <Row>
                  <h2>
                    <a href={`/${item.slug}`} onClick={() => countView()}>
                      {item.seo.title}
                    </a>{" "}
                  </h2>
                </Row>
                <Row>
                  <h5>{item.seo.description}</h5>
                </Row>
                <Row>
                  <h6>Author: {item.author.display_name}</h6>
                </Row>
              </Col>
            </Row>
          ))}
        </InfiniteScroll>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  page: state.postReducer.page,
});
export default connect(mapStateToProps, { getPosts })(ListPost);
