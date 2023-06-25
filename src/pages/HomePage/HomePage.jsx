
import React from "react";
import { Card, Rate } from "antd";
import { Link } from "react-router-dom";

// helpers
// import postsList from "../../helpers/server";

// assets
import "../../assets/styles/pages/home-page.scss";


function HomePage() {


  return (
    <section className="home-page">
     <h1>My Home page</h1>
      {/* {
        postsList.map((item, index) => (
          <Link to={`/posts/${item.id}`} key={`${index}-${item.id}`}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={item.mainImage} />}
              actions={[<Rate allowHalf disabled defaultValue={item.rate}/>]}
            >
              <Card.Meta
                title={item.title}
                description={(
                  <div>
                    <p>{item.shortInto}</p>
                    <i>{item.author}</i>
                  </div>
                )}
              />
            </Card>
          </Link>
        ))
      } */}
    </section>
  );
}

export default HomePage;