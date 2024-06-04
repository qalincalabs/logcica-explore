import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { ProductCardList } from "../components/product-card-list";
import Layout from "../components/layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <ProductCardList />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;