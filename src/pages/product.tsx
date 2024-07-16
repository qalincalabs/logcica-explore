import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { ProductCardList } from "../components/product-card-list";
import Layout from "../components/layout";
import { Box, Typography } from "@mui/material";

const ProductPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Box p={2}>
        <Typography align="center" variant="h3" my={4} sx={{ fontWeight: 'bold', color: '#FFD700' }}>
          Produits
        </Typography>
        <ProductCardList />
      </Box>
    </Layout>
  );
};

export default ProductPage;

export const Head: HeadFC = () => <title>Produits</title>;
