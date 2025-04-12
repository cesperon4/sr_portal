"use client";

import * as React from "react";
import Pagination from "@mui/material/Pagination";

interface PaginateProps {
  count: number;
  setCurrentPage: (page: number) => void;
}
export function Paginate({ count, setCurrentPage }: PaginateProps) {
  return (
    <Pagination
      count={count}
      color="primary"
      size="large"
      className=""
      variant="outlined"
      onChange={(e, page) => {
        setCurrentPage(page);
      }}
    />
  );
}
