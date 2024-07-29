import { Box, Typography } from "@mui/material";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { ProductCardList } from "../components/product-card-list";

const ProductPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Box p={2}>
        <Typography
          align="center"
          variant="h3"
          my={4}
          sx={{ fontWeight: "bold", color: "#FFD700" }}
        >
          Produits
        </Typography>
        <ProductCardList />
      </Box>
    </Layout>
  );
};

export default ProductPage;

export const Head: HeadFC = () => <title>Produits</title>;
